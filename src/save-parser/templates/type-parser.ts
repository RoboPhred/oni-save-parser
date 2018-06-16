import {
  ParseIterator,
  readInt32,
  readBytes,
  readByte,
  readDouble,
  readInt16,
  readInt64,
  readSByte,
  readSingle,
  readKleiString,
  readUInt16,
  readUInt32,
  readUInt64,
  getReaderPosition,
  WriteIterator,
  writeInt32,
  writeBytes,
  writeByte,
  writeDouble,
  writeInt16,
  writeInt64,
  writeSByte,
  writeSingle,
  writeKleiString,
  writeUInt16,
  writeUInt32,
  writeUInt64,
  writeDataLengthBegin,
  DataLengthToken,
  getWriterPosition,
  writeDataLengthEnd
} from "../../parser";
import {
  TypeTemplates,
  TypeInfo,
  getTypeCode,
  SerializationTypeCode,
  isValueType
} from "../../save-structure/type-templates";

export interface TemplateParser {
  parseByTemplate<T>(templateName: string): ParseIterator<T>;
}
export interface TemplateWriter {
  writeByTemplate<T>(templateName: string, value: T): WriteIterator;
}

export function* parseByTemplate<T>(
  templates: TypeTemplates,
  templateName: string
): ParseIterator<T> {
  const template = templates.find(x => x.name === templateName);
  if (!template) {
    throw new Error(`Template "${templateName}" not found.`);
  }

  const result: any = {};

  for (let field of template.fields) {
    const { name, type } = field;
    const value = yield* parseByType(type, templates);
    result[name] = value;
  }

  for (let prop of template.properties) {
    const { name, type } = prop;
    const value = yield* parseByType(type, templates);
    result[name] = value;
  }

  return result;
}

export function* writeByTemplate<T>(
  templates: TypeTemplates,
  templateName: string,
  obj: T
): WriteIterator {
  const template = templates.find(x => x.name === templateName);
  if (!template) {
    throw new Error(`Template "${templateName}" not found.`);
  }

  for (let field of template.fields) {
    const { name, type } = field;
    const value = (obj as any)[name];
    yield* writeByType(value, type, templates);
  }

  for (let prop of template.properties) {
    const { name, type } = prop;
    const value = (obj as any)[name];
    yield* writeByType(value, type, templates);
  }
}

interface TypeParser {
  read(info: TypeInfo, templates: TypeTemplates): ParseIterator<any>;
  write(value: any, info: TypeInfo, templates: TypeTemplates): WriteIterator;
}

function* sharedArrayParser(info: TypeInfo, templates: TypeTemplates) {
  const [elementType] = info.subTypes!;

  // data-length
  //  Note that if length is -1, this is 4 (the length of the count).
  //  If length is >= 0, this is the length of the element
  //  portion, NOT INCLUDING the count.
  yield readInt32();

  // element-length
  const length = yield readInt32();
  if (length === -1) {
    return null;
  } else if (length >= 0) {
    const typeCode = getTypeCode(elementType.info);
    if (typeCode === SerializationTypeCode.Byte) {
      const data = yield readBytes(length);
      return new Uint8Array(data);
    } else if (isValueType(elementType.info)) {
      if (typeCode !== SerializationTypeCode.UserDefined) {
        throw new Error(`Type ${typeCode} cannot be parsed as a value-type.`);
      }
      const typeName = elementType.templateName!;
      // In the ONI code, this skips straight back to a SerializationMapping (parseByTemplate) and bypasses ReadValue (parseByType)
      //  This effectively skips out writing the data length, probably because that is also used to indicate null values.
      const elements = new Array(length);
      for (let i = 0; i < length; i++) {
        const element = yield* parseByTemplate(templates, typeName);
        elements[i] = element;
      }

      return elements;
    } else {
      const elements = new Array(length);
      for (let i = 0; i < length; i++) {
        const element = yield* parseByType(elementType, templates);
        elements[i] = element;
      }

      return elements;
    }
  } else {
    throw new Error(`Failed to parse array: Invalid length value of ${length}`);
  }
}

function* sharedArrayWriter(
  values: any,
  info: TypeInfo,
  templates: TypeTemplates
): WriteIterator {
  const [elementType] = info.subTypes!;

  if (values == null) {
    // ONI inconsistancy: Element count is only included
    //  in the data-length when the array is null.
    yield writeInt32(4);
    yield writeInt32(-1);
  } else {
    // Despite ONI not making use of the data length, we still calculate it
    //  and store it against the day that it might be used.

    const lengthToken: DataLengthToken = yield writeDataLengthBegin();

    // Frustratingly, the element count is written after the length but not included
    //  in it.
    yield writeInt32(values.length);
    lengthToken.startPosition = yield getWriterPosition();

    if (getTypeCode(elementType.info) === SerializationTypeCode.Byte) {
      if (!(values instanceof Uint8Array)) {
        throw new Error("Expected byte array value to be Uint8Array.");
      }
      yield writeBytes(values);
    } else if (isValueType(elementType.info)) {
      // In the ONI code, this skips straight back to a SerializationMapping (parseByTemplate) and bypasses ReadValue (parseByType)
      //  This effectively skips out writing the data length, probably because that is also used to indicate null values.
      const templateName = elementType.templateName!;
      for (let element of values) {
        yield* writeByTemplate(templates, templateName, element);
      }
    } else {
      for (let element of values) {
        yield* writeByType(element, elementType, templates);
      }
    }

    yield writeDataLengthEnd(lengthToken);
  }
}

const typeParsers: Record<SerializationTypeCode, TypeParser> = {
  [SerializationTypeCode.Array]: {
    read: sharedArrayParser,
    write: sharedArrayWriter
  },
  [SerializationTypeCode.Boolean]: {
    read: function*() {
      const b = yield readByte();
      return Boolean(b);
    },
    write: function*(value) {
      yield writeByte(value ? 1 : 0);
    }
  },
  [SerializationTypeCode.Byte]: {
    read: function*() {
      return yield readByte();
    },
    write: function*(value) {
      yield writeByte(value);
    }
  },
  [SerializationTypeCode.Colour]: {
    read: function*() {
      const rb = yield readByte();
      const gb = yield readByte();
      const bb = yield readByte();
      const ab = yield readByte();
      return {
        r: rb / 255,
        g: gb / 255,
        b: bb / 255,
        a: ab / 255
      };
    },
    write: function*(value) {
      yield writeByte(fracToByte(value.r));
      yield writeByte(fracToByte(value.g));
      yield writeByte(fracToByte(value.b));
      yield writeByte(fracToByte(value.a));
    }
  },
  [SerializationTypeCode.Dictionary]: {
    read: function*(info, templates) {
      const [keyType, valueType] = info.subTypes!;

      // data-length.  4 if null.
      yield readInt32();

      // element-count.  -1 if null.
      const count = yield readInt32();
      if (count >= 0) {
        let pairs: [any, any][] = new Array(count);

        // Values are parsed first
        for (let i = 0; i < count; i++) {
          pairs[i] = new Array(2) as [any, any];
          pairs[i][1] = yield* parseByType(valueType, templates);
        }

        for (let i = 0; i < count; i++) {
          pairs[i][0] = yield* parseByType(keyType, templates);
        }

        return pairs;
      } else {
        return null;
      }
    },
    write: function*(value: [any, any][], info, templates) {
      if (value == null) {
        // ONI inconsistancy: Element count is only included
        //  in the data-length when the dictionary is null.
        yield writeInt32(4);
        yield writeInt32(-1);
      } else {
        const [keyType, valueType] = info.subTypes!;
        // Despite ONI not making use of the data length, we still calculate it
        //  and store it against the day that it might be used.

        const lengthToken: DataLengthToken = yield writeDataLengthBegin();

        // Frustratingly, the element count is written after the length but not included
        //  in it.
        yield writeInt32(value.length);
        lengthToken.startPosition = yield getWriterPosition();

        // Values come first.
        for (let element of value) {
          yield* writeByType(element[1], valueType, templates);
        }
        for (let element of value) {
          yield* writeByType(element[0], keyType, templates);
        }

        yield writeDataLengthEnd(lengthToken);
      }
    }
  },
  [SerializationTypeCode.Double]: {
    read: function*() {
      return yield readDouble();
    },
    write: function*(value) {
      yield writeDouble(value);
    }
  },
  [SerializationTypeCode.Enumeration]: {
    read: function*() {
      return yield readInt32();
    },
    write: function*(value) {
      yield writeInt32(value);
    }
  },
  [SerializationTypeCode.HashSet]: {
    read: sharedArrayParser,
    write: sharedArrayWriter
  },
  [SerializationTypeCode.Int16]: {
    read: function*() {
      return yield readInt16();
    },
    write: function*(value) {
      yield writeInt16(value);
    }
  },
  [SerializationTypeCode.Int32]: {
    read: function*() {
      return yield readInt32();
    },
    write: function*(value) {
      yield writeInt32(value);
    }
  },
  [SerializationTypeCode.Int64]: {
    read: function*() {
      return yield readInt64();
    },
    write: function*(value) {
      yield writeInt64(value);
    }
  },
  [SerializationTypeCode.List]: {
    read: sharedArrayParser,
    write: sharedArrayWriter
  },
  [SerializationTypeCode.Pair]: {
    // ONI BUG:
    //  On null pair, ONI writes out [4, -1], as if it was
    //  writing out null to a variable-length collection.
    // However, it checks for a first value >= 0 to indicate not-null,
    //  meaning it will parse a null as not-null and get the parser
    //  into an incorrect state.
    // We reproduce the faulty behavior here to remain accurate to ONI.
    read: function*(info, templates) {
      // Writer mirrors ONI code and writes unparsable data.  See ONI bug description above.
      const dataLength = yield readInt32();
      if (dataLength >= 0) {
        // Trying to parse a data length of 0 makes no sense,
        //  but we are following ONI code.  Do not change this logic.
        const [keyType, valueType] = info.subTypes!;
        const key = yield* parseByType(keyType, templates);
        const value = yield* parseByType(valueType, templates);
        return {
          key,
          value
        };
      } else {
        return null;
      }
    },
    write: function*(value, info, templates) {
      // Writer mirrors ONI code and writes unparsable data.  See ONI bug description above.
      if (value == null) {
        yield writeInt32(4);
        yield writeInt32(-1);
      } else {
        const [keyType, valueType] = info.subTypes!;

        // Despite ONI not making use of the data length, we still calculate it
        //  and store it against the day that it might be used.

        const lengthToken = yield writeDataLengthBegin();

        yield* writeByType(value.key, keyType, templates);
        yield* writeByType(value.value, valueType, templates);

        yield writeDataLengthEnd(lengthToken);
      }
    }
  },
  [SerializationTypeCode.SByte]: {
    read: function*() {
      return yield readSByte();
    },
    write: function*(value) {
      yield writeSByte(value);
    }
  },
  [SerializationTypeCode.Single]: {
    read: function*() {
      return yield readSingle();
    },
    write: function*(value) {
      yield writeSingle(value);
    }
  },
  [SerializationTypeCode.String]: {
    read: function*() {
      return yield readKleiString();
    },
    write: function*(value) {
      yield writeKleiString(value);
    }
  },
  [SerializationTypeCode.UInt16]: {
    read: function*() {
      return yield readUInt16();
    },
    write: function*(value) {
      yield writeUInt16(value);
    }
  },
  [SerializationTypeCode.UInt32]: {
    read: function*() {
      return yield readUInt32();
    },
    write: function*(value) {
      yield writeUInt32(value);
    }
  },
  [SerializationTypeCode.UInt64]: {
    read: function*() {
      return yield readUInt64();
    },
    write: function*(value) {
      yield writeUInt64(value);
    }
  },
  [SerializationTypeCode.UserDefined]: {
    read: function*(info, templates) {
      const templateName = info.templateName!;

      const dataLength = yield readInt32();
      if (dataLength < 0) {
        return null;
      }

      const parseStart = yield getReaderPosition();
      const obj = yield* parseByTemplate(templates, templateName);
      const parseEnd = yield getReaderPosition();

      const parseLength = parseEnd - parseStart;
      if (parseLength !== dataLength) {
        throw new Error(
          `Failed to parse object: Template name "${templateName}" parsed ${Math.abs(
            parseLength - dataLength
          )} ${parseLength > dataLength ? "more" : "less"} than expected.`
        );
      }

      return obj;
    },
    write: function*(value, info, templates) {
      const templateName = info.templateName!;
      if (value == null) {
        yield writeInt32(-1);
      } else {
        const lengthToken = yield writeDataLengthBegin();
        yield* writeByTemplate(templates, templateName, value);
        yield writeDataLengthEnd(lengthToken);
      }
    }
  },
  [SerializationTypeCode.Vector2]: {
    read: function*() {
      const x = yield readSingle();
      const y = yield readSingle();
      return {
        x,
        y
      };
    },
    write: function*(value) {
      yield writeSingle(value.x);
      yield writeSingle(value.y);
    }
  },
  [SerializationTypeCode.Vector2I]: {
    read: function*() {
      const x = yield readInt32();
      const y = yield readInt32();
      return {
        x,
        y
      };
    },
    write: function*(value) {
      yield writeInt32(value.x);
      yield writeInt32(value.y);
    }
  },
  [SerializationTypeCode.Vector3]: {
    read: function*() {
      const x = yield readSingle();
      const y = yield readSingle();
      const z = yield readSingle();
      return {
        x,
        y,
        z
      };
    },
    write: function*(value) {
      yield writeSingle(value.x);
      yield writeSingle(value.y);
      yield writeSingle(value.z);
    }
  }
};

export function* parseByType(
  info: TypeInfo,
  templates: TypeTemplates
): ParseIterator<any> {
  const type = getTypeCode(info.info);
  const parser = typeParsers[type];
  if (!parser) {
    throw new Error(`Unknown type code "${type}" (typeinfo: "${info.info}").`);
  }
  return yield* parser.read(info, templates);
}

export function* writeByType(
  value: any,
  info: TypeInfo,
  templates: TypeTemplates
): ParseIterator<any> {
  const type = getTypeCode(info.info);
  const parser = typeParsers[type];
  if (!parser) {
    throw new Error(`Unknown type code "${type}" (typeinfo: "${info.info}").`);
  }
  return yield* parser.write(value, info, templates);
}

function fracToByte(num: number): number {
  const byte = Math.round(num * 255);
  if (byte < 0) return 0;
  if (byte > 255) return 255;

  return byte;
}
