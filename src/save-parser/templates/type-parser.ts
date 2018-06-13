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
  getReaderPosition
} from "../../parser";
import {
  TypeTemplates,
  TypeInfo,
  getTypeCode,
  SerializationTypeCode
} from "../../save-structure/type-templates";

export interface TemplateParser {
  parseByTemplate<T>(templateName: string): ParseIterator<T>;
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

interface TypeParser {
  (info: TypeInfo, templates: TypeTemplates): ParseIterator<any>;
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
    if (getTypeCode(elementType.info) === SerializationTypeCode.Byte) {
      const data = yield readBytes(length);
      return new Uint8Array(data);
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

const typeParsers: Record<SerializationTypeCode, TypeParser> = {
  [SerializationTypeCode.Array]: sharedArrayParser,
  [SerializationTypeCode.Boolean]: function*() {
    const b = yield readByte();
    return Boolean(b);
  },
  [SerializationTypeCode.Byte]: function*() {
    return yield readByte();
  },
  [SerializationTypeCode.Colour]: function*(info) {
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
  [SerializationTypeCode.Dictionary]: function*(info, templates) {
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
  [SerializationTypeCode.Double]: function*() {
    return yield readDouble();
  },
  [SerializationTypeCode.Enumeration]: function*() {
    return yield readInt32();
  },
  [SerializationTypeCode.HashSet]: sharedArrayParser,
  [SerializationTypeCode.Int16]: function*() {
    return yield readInt16();
  },
  [SerializationTypeCode.Int32]: function*() {
    return yield readInt32();
  },
  [SerializationTypeCode.Int64]: function*() {
    return yield readInt64();
  },
  [SerializationTypeCode.List]: sharedArrayParser,
  [SerializationTypeCode.Pair]: function*(info, templates) {
    // Writer mirrors ONI code and writes unparsable data.
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
  [SerializationTypeCode.SByte]: function*() {
    return yield readSByte();
  },
  [SerializationTypeCode.Single]: function*() {
    return yield readSingle();
  },
  [SerializationTypeCode.String]: function*() {
    return yield readKleiString();
  },
  [SerializationTypeCode.UInt16]: function*() {
    return yield readUInt16();
  },
  [SerializationTypeCode.UInt32]: function*() {
    return yield readUInt32();
  },
  [SerializationTypeCode.UInt64]: function*() {
    return yield readUInt64();
  },
  [SerializationTypeCode.UserDefined]: function*(info, templates) {
    const templateName = info.typeName!;

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
  [SerializationTypeCode.Vector2]: function*() {
    const x = yield readSingle();
    const y = yield readSingle();
    return {
      x,
      y
    };
  },
  [SerializationTypeCode.Vector2I]: function*() {
    const x = yield readInt32();
    const y = yield readInt32();
    return {
      x,
      y
    };
  },
  [SerializationTypeCode.Vector3]: function*() {
    const x = yield readSingle();
    const y = yield readSingle();
    const z = yield readSingle();
    return {
      x,
      y,
      z
    };
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
  return yield* parser(info, templates);
}
