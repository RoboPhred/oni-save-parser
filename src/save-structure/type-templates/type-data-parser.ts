import {
  ParseIterator,
  UnparseIterator,
  DataLengthToken,
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
import { parseByTemplate, unparseByTemplate } from "./template-data-parser";

interface TypeParser {
  parse(info: TypeInfo, templates: TypeTemplates): ParseIterator<any>;
  unparse(
    value: any,
    info: TypeInfo,
    templates: TypeTemplates
  ): UnparseIterator;
}

function* parseArrayLike(info: TypeInfo, templates: TypeTemplates) {
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

function* unparseArrayLike(
  values: any,
  info: TypeInfo,
  templates: TypeTemplates
): UnparseIterator {
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
        yield* unparseByTemplate(templates, templateName, element);
      }
    } else {
      for (let element of values) {
        yield* unparseByType(element, elementType, templates);
      }
    }

    yield writeDataLengthEnd(lengthToken);
  }
}

const typeParsers: Record<SerializationTypeCode, TypeParser> = {
  [SerializationTypeCode.Array]: {
    parse: parseArrayLike,
    unparse: unparseArrayLike
  },
  [SerializationTypeCode.Boolean]: {
    parse: function*() {
      const b = yield readByte();
      return Boolean(b);
    },
    unparse: function*(value) {
      yield writeByte(value ? 1 : 0);
    }
  },
  [SerializationTypeCode.Byte]: {
    parse: function*() {
      return yield readByte();
    },
    unparse: function*(value) {
      yield writeByte(value);
    }
  },
  [SerializationTypeCode.Colour]: {
    parse: function*() {
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
    unparse: function*(value) {
      yield writeByte(fracToByte(value.r));
      yield writeByte(fracToByte(value.g));
      yield writeByte(fracToByte(value.b));
      yield writeByte(fracToByte(value.a));
    }
  },
  [SerializationTypeCode.Dictionary]: {
    parse: function*(info, templates) {
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
    unparse: function*(value: [any, any][], info, templates) {
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
          yield* unparseByType(element[1], valueType, templates);
        }
        for (let element of value) {
          yield* unparseByType(element[0], keyType, templates);
        }

        yield writeDataLengthEnd(lengthToken);
      }
    }
  },
  [SerializationTypeCode.Double]: {
    parse: function*() {
      return yield readDouble();
    },
    unparse: function*(value) {
      yield writeDouble(value);
    }
  },
  [SerializationTypeCode.Enumeration]: {
    parse: function*() {
      return yield readInt32();
    },
    unparse: function*(value) {
      yield writeInt32(value);
    }
  },
  [SerializationTypeCode.HashSet]: {
    parse: parseArrayLike,
    unparse: unparseArrayLike
  },
  [SerializationTypeCode.Int16]: {
    parse: function*() {
      return yield readInt16();
    },
    unparse: function*(value) {
      yield writeInt16(value);
    }
  },
  [SerializationTypeCode.Int32]: {
    parse: function*() {
      return yield readInt32();
    },
    unparse: function*(value) {
      yield writeInt32(value);
    }
  },
  [SerializationTypeCode.Int64]: {
    parse: function*() {
      return yield readInt64();
    },
    unparse: function*(value) {
      yield writeInt64(value);
    }
  },
  [SerializationTypeCode.List]: {
    parse: parseArrayLike,
    unparse: unparseArrayLike
  },
  [SerializationTypeCode.Pair]: {
    // ONI BUG:
    //  On null pair, ONI writes out [4, -1], as if it was
    //  writing out null to a variable-length collection.
    // However, it checks for a first value >= 0 to indicate not-null,
    //  meaning it will parse a null as not-null and get the parser
    //  into an incorrect state.
    // We reproduce the faulty behavior here to remain accurate to ONI.
    parse: function*(info, templates) {
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
    unparse: function*(value, info, templates) {
      // Writer mirrors ONI code and writes unparsable data.  See ONI bug description above.
      if (value == null) {
        yield writeInt32(4);
        yield writeInt32(-1);
      } else {
        const [keyType, valueType] = info.subTypes!;

        // Despite ONI not making use of the data length, we still calculate it
        //  and store it against the day that it might be used.

        const lengthToken = yield writeDataLengthBegin();

        yield* unparseByType(value.key, keyType, templates);
        yield* unparseByType(value.value, valueType, templates);

        yield writeDataLengthEnd(lengthToken);
      }
    }
  },
  [SerializationTypeCode.SByte]: {
    parse: function*() {
      return yield readSByte();
    },
    unparse: function*(value) {
      yield writeSByte(value);
    }
  },
  [SerializationTypeCode.Single]: {
    parse: function*() {
      return yield readSingle();
    },
    unparse: function*(value) {
      yield writeSingle(value);
    }
  },
  [SerializationTypeCode.String]: {
    parse: function*() {
      return yield readKleiString();
    },
    unparse: function*(value) {
      yield writeKleiString(value);
    }
  },
  [SerializationTypeCode.UInt16]: {
    parse: function*() {
      return yield readUInt16();
    },
    unparse: function*(value) {
      yield writeUInt16(value);
    }
  },
  [SerializationTypeCode.UInt32]: {
    parse: function*() {
      return yield readUInt32();
    },
    unparse: function*(value) {
      yield writeUInt32(value);
    }
  },
  [SerializationTypeCode.UInt64]: {
    parse: function*() {
      return yield readUInt64();
    },
    unparse: function*(value) {
      yield writeUInt64(value);
    }
  },
  [SerializationTypeCode.UserDefined]: {
    parse: function*(info, templates) {
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
    unparse: function*(value, info, templates) {
      const templateName = info.templateName!;
      if (value == null) {
        yield writeInt32(-1);
      } else {
        const lengthToken = yield writeDataLengthBegin();
        yield* unparseByTemplate(templates, templateName, value);
        yield writeDataLengthEnd(lengthToken);
      }
    }
  },
  [SerializationTypeCode.Vector2]: {
    parse: function*() {
      const x = yield readSingle();
      const y = yield readSingle();
      return {
        x,
        y
      };
    },
    unparse: function*(value) {
      yield writeSingle(value.x);
      yield writeSingle(value.y);
    }
  },
  [SerializationTypeCode.Vector2I]: {
    parse: function*() {
      const x = yield readInt32();
      const y = yield readInt32();
      return {
        x,
        y
      };
    },
    unparse: function*(value) {
      yield writeInt32(value.x);
      yield writeInt32(value.y);
    }
  },
  [SerializationTypeCode.Vector3]: {
    parse: function*() {
      const x = yield readSingle();
      const y = yield readSingle();
      const z = yield readSingle();
      return {
        x,
        y,
        z
      };
    },
    unparse: function*(value) {
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
  return yield* parser.parse(info, templates);
}

export function* unparseByType(
  value: any,
  info: TypeInfo,
  templates: TypeTemplates
): ParseIterator<any> {
  const type = getTypeCode(info.info);
  const parser = typeParsers[type];
  if (!parser) {
    throw new Error(`Unknown type code "${type}" (typeinfo: "${info.info}").`);
  }
  return yield* parser.unparse(value, info, templates);
}

function fracToByte(num: number): number {
  const byte = Math.round(num * 255);
  if (byte < 0) return 0;
  if (byte > 255) return 255;

  return byte;
}
