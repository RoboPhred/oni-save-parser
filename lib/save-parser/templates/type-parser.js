"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("../../parser");
const type_templates_1 = require("../../save-structure/type-templates");
function* parseByTemplate(templates, templateName) {
    const template = templates.find(x => x.name === templateName);
    if (!template) {
        throw new Error(`Template "${templateName}" not found.`);
    }
    const result = {};
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
exports.parseByTemplate = parseByTemplate;
function* sharedArrayParser(info, templates) {
    const [elementType] = info.subTypes;
    // data-length
    //  Note that if length is -1, this is 4 (the length of the count).
    //  If length is >= 0, this is the length of the element
    //  portion, NOT INCLUDING the count.
    yield parser_1.readInt32();
    // element-length
    const length = yield parser_1.readInt32();
    if (length === -1) {
        return null;
    }
    else if (length >= 0) {
        if (type_templates_1.getTypeCode(elementType.info) === type_templates_1.SerializationTypeCode.Byte) {
            const data = yield parser_1.readBytes(length);
            return new Uint8Array(data);
        }
        else {
            const elements = new Array(length);
            for (let i = 0; i < length; i++) {
                const element = yield* parseByType(elementType, templates);
                elements[i] = element;
            }
            return elements;
        }
    }
    else {
        throw new Error(`Failed to parse array: Invalid length value of ${length}`);
    }
}
const typeParsers = {
    [type_templates_1.SerializationTypeCode.Array]: sharedArrayParser,
    [type_templates_1.SerializationTypeCode.Boolean]: function* () {
        const b = yield parser_1.readByte();
        return Boolean(b);
    },
    [type_templates_1.SerializationTypeCode.Byte]: function* () {
        return yield parser_1.readByte();
    },
    [type_templates_1.SerializationTypeCode.Colour]: function* (info) {
        const rb = yield parser_1.readByte();
        const gb = yield parser_1.readByte();
        const bb = yield parser_1.readByte();
        const ab = yield parser_1.readByte();
        return {
            r: rb / 255,
            g: gb / 255,
            b: bb / 255,
            a: ab / 255
        };
    },
    [type_templates_1.SerializationTypeCode.Dictionary]: function* (info, templates) {
        const [keyType, valueType] = info.subTypes;
        // data-length.  4 if null.
        yield parser_1.readInt32();
        // element-count.  -1 if null.
        const count = yield parser_1.readInt32();
        if (count >= 0) {
            let pairs = new Array(count);
            // Values are parsed first
            for (let i = 0; i < count; i++) {
                pairs[i] = new Array(2);
                pairs[i][1] = yield* parseByType(valueType, templates);
            }
            for (let i = 0; i < count; i++) {
                pairs[i][0] = yield* parseByType(keyType, templates);
            }
            return pairs;
        }
        else {
            return null;
        }
    },
    [type_templates_1.SerializationTypeCode.Double]: function* () {
        return yield parser_1.readDouble();
    },
    [type_templates_1.SerializationTypeCode.Enumeration]: function* () {
        return yield parser_1.readInt32();
    },
    [type_templates_1.SerializationTypeCode.HashSet]: sharedArrayParser,
    [type_templates_1.SerializationTypeCode.Int16]: function* () {
        return yield parser_1.readInt16();
    },
    [type_templates_1.SerializationTypeCode.Int32]: function* () {
        return yield parser_1.readInt32();
    },
    [type_templates_1.SerializationTypeCode.Int64]: function* () {
        return yield parser_1.readInt64();
    },
    [type_templates_1.SerializationTypeCode.List]: sharedArrayParser,
    [type_templates_1.SerializationTypeCode.Pair]: function* (info, templates) {
        // Writer mirrors ONI code and writes unparsable data.
        const dataLength = yield parser_1.readInt32();
        if (dataLength >= 0) {
            // Trying to parse a data length of 0 makes no sense,
            //  but we are following ONI code.  Do not change this logic.
            const [keyType, valueType] = info.subTypes;
            const key = yield* parseByType(keyType, templates);
            const value = yield* parseByType(valueType, templates);
            return {
                key,
                value
            };
        }
        else {
            return null;
        }
    },
    [type_templates_1.SerializationTypeCode.SByte]: function* () {
        return yield parser_1.readSByte();
    },
    [type_templates_1.SerializationTypeCode.Single]: function* () {
        return yield parser_1.readSingle();
    },
    [type_templates_1.SerializationTypeCode.String]: function* () {
        return yield parser_1.readKleiString();
    },
    [type_templates_1.SerializationTypeCode.UInt16]: function* () {
        return yield parser_1.readUInt16();
    },
    [type_templates_1.SerializationTypeCode.UInt32]: function* () {
        return yield parser_1.readUInt32();
    },
    [type_templates_1.SerializationTypeCode.UInt64]: function* () {
        return yield parser_1.readUInt64();
    },
    [type_templates_1.SerializationTypeCode.UserDefined]: function* (info, templates) {
        const templateName = info.typeName;
        const dataLength = yield parser_1.readInt32();
        if (dataLength < 0) {
            return null;
        }
        const parseStart = yield parser_1.getReaderPosition();
        const obj = yield* parseByTemplate(templates, templateName);
        const parseEnd = yield parser_1.getReaderPosition();
        const parseLength = parseEnd - parseStart;
        if (parseLength !== dataLength) {
            throw new Error(`Failed to parse object: Template name "${templateName}" parsed ${Math.abs(parseLength - dataLength)} ${parseLength > dataLength ? "more" : "less"} than expected.`);
        }
        return obj;
    },
    [type_templates_1.SerializationTypeCode.Vector2]: function* () {
        const x = yield parser_1.readSingle();
        const y = yield parser_1.readSingle();
        return {
            x,
            y
        };
    },
    [type_templates_1.SerializationTypeCode.Vector2I]: function* () {
        const x = yield parser_1.readInt32();
        const y = yield parser_1.readInt32();
        return {
            x,
            y
        };
    },
    [type_templates_1.SerializationTypeCode.Vector3]: function* () {
        const x = yield parser_1.readSingle();
        const y = yield parser_1.readSingle();
        const z = yield parser_1.readSingle();
        return {
            x,
            y,
            z
        };
    }
};
function* parseByType(info, templates) {
    const type = type_templates_1.getTypeCode(info.info);
    const parser = typeParsers[type];
    if (!parser) {
        throw new Error(`Unknown type code "${type}" (typeinfo: "${info.info}").`);
    }
    return yield* parser(info, templates);
}
exports.parseByType = parseByType;
//# sourceMappingURL=type-parser.js.map