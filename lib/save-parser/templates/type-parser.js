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
function* writeByTemplate(templates, templateName, obj) {
    const template = templates.find(x => x.name === templateName);
    if (!template) {
        throw new Error(`Template "${templateName}" not found.`);
    }
    for (let field of template.fields) {
        const { name, type } = field;
        const value = obj[name];
        yield* writeByType(value, type, templates);
    }
    for (let prop of template.properties) {
        const { name, type } = prop;
        const value = obj[name];
        yield* writeByType(value, type, templates);
    }
}
exports.writeByTemplate = writeByTemplate;
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
function* sharedArrayWriter(value, info, templates) {
    const [elementType] = info.subTypes;
    if (value == null) {
        // ONI inconsistancy: Element count is only included
        //  in the data-length when the array is null.
        yield parser_1.writeInt32(4);
        yield parser_1.writeInt32(-1);
    }
    else {
        // Despite ONI not making use of the data length, we still calculate it
        //  and store it against the day that it might be used.
        const lengthToken = yield parser_1.writeDataLengthBegin();
        // Frustratingly, the element count is written after the length but not included
        //  in it.
        yield parser_1.writeInt32(value.length);
        lengthToken.startPosition = yield parser_1.getWriterPosition();
        if (type_templates_1.getTypeCode(elementType.info) === type_templates_1.SerializationTypeCode.Byte) {
            if (!(value instanceof Uint8Array)) {
                throw new Error("Expected byte array value to be Uint8Array.");
            }
            yield parser_1.writeBytes(value);
        }
        else {
            for (let element of value) {
                yield* writeByType(element, elementType, templates);
            }
        }
        yield parser_1.writeDataLengthEnd(lengthToken);
    }
}
const typeParsers = {
    [type_templates_1.SerializationTypeCode.Array]: {
        read: sharedArrayParser,
        write: sharedArrayWriter
    },
    [type_templates_1.SerializationTypeCode.Boolean]: {
        read: function* () {
            const b = yield parser_1.readByte();
            return Boolean(b);
        },
        write: function* (value) {
            yield parser_1.writeByte(value ? 1 : 0);
        }
    },
    [type_templates_1.SerializationTypeCode.Byte]: {
        read: function* () {
            return yield parser_1.readByte();
        },
        write: function* (value) {
            yield parser_1.writeByte(value);
        }
    },
    [type_templates_1.SerializationTypeCode.Colour]: {
        read: function* () {
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
        write: function* (value) {
            yield parser_1.writeByte(fracToByte(value.r));
            yield parser_1.writeByte(fracToByte(value.g));
            yield parser_1.writeByte(fracToByte(value.b));
            yield parser_1.writeByte(fracToByte(value.a));
        }
    },
    [type_templates_1.SerializationTypeCode.Dictionary]: {
        read: function* (info, templates) {
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
        write: function* (value, info, templates) {
            if (value == null) {
                // ONI inconsistancy: Element count is only included
                //  in the data-length when the dictionary is null.
                yield parser_1.writeInt32(4);
                yield parser_1.writeInt32(-1);
            }
            else {
                const [keyType, valueType] = info.subTypes;
                // Despite ONI not making use of the data length, we still calculate it
                //  and store it against the day that it might be used.
                const lengthToken = yield parser_1.writeDataLengthBegin();
                // Frustratingly, the element count is written after the length but not included
                //  in it.
                yield parser_1.writeInt32(value.length);
                lengthToken.startPosition = yield parser_1.getWriterPosition();
                // Values come first.
                for (let element of value) {
                    yield* writeByType(element[1], valueType, templates);
                }
                for (let element of value) {
                    yield* writeByType(element[0], keyType, templates);
                }
                yield parser_1.writeDataLengthEnd(lengthToken);
            }
        }
    },
    [type_templates_1.SerializationTypeCode.Double]: {
        read: function* () {
            return yield parser_1.readDouble();
        },
        write: function* (value) {
            yield parser_1.writeDouble(value);
        }
    },
    [type_templates_1.SerializationTypeCode.Enumeration]: {
        read: function* () {
            return yield parser_1.readInt32();
        },
        write: function* (value) {
            yield parser_1.writeInt32(value);
        }
    },
    [type_templates_1.SerializationTypeCode.HashSet]: {
        read: sharedArrayParser,
        write: sharedArrayWriter
    },
    [type_templates_1.SerializationTypeCode.Int16]: {
        read: function* () {
            return yield parser_1.readInt16();
        },
        write: function* (value) {
            yield parser_1.writeInt16(value);
        }
    },
    [type_templates_1.SerializationTypeCode.Int32]: {
        read: function* () {
            return yield parser_1.readInt32();
        },
        write: function* (value) {
            yield parser_1.writeInt32(value);
        }
    },
    [type_templates_1.SerializationTypeCode.Int64]: {
        read: function* () {
            return yield parser_1.readInt64();
        },
        write: function* (value) {
            yield parser_1.writeInt64(value);
        }
    },
    [type_templates_1.SerializationTypeCode.List]: {
        read: sharedArrayParser,
        write: sharedArrayWriter
    },
    [type_templates_1.SerializationTypeCode.Pair]: {
        // ONI BUG:
        //  On null pair, ONI writes out [4, -1], as if it was
        //  writing out null to a variable-length collection.
        // However, it checks for a first value >= 0 to indicate not-null,
        //  meaning it will parse a null as not-null and get the parser
        //  into an incorrect state.
        // We reproduce the faulty behavior here to remain accurate to ONI.
        read: function* (info, templates) {
            // Writer mirrors ONI code and writes unparsable data.  See ONI bug description above.
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
        write: function* (value, info, templates) {
            // Writer mirrors ONI code and writes unparsable data.  See ONI bug description above.
            if (value == null) {
                yield parser_1.writeInt32(4);
                yield parser_1.writeInt32(-1);
            }
            else {
                const [keyType, valueType] = info.subTypes;
                // Despite ONI not making use of the data length, we still calculate it
                //  and store it against the day that it might be used.
                const lengthToken = yield parser_1.writeDataLengthBegin();
                yield* writeByType(value.key, keyType, templates);
                yield* writeByType(value.value, valueType, templates);
                yield parser_1.writeDataLengthEnd(lengthToken);
            }
        }
    },
    [type_templates_1.SerializationTypeCode.SByte]: {
        read: function* () {
            return yield parser_1.readSByte();
        },
        write: function* (value) {
            yield parser_1.writeSByte(value);
        }
    },
    [type_templates_1.SerializationTypeCode.Single]: {
        read: function* () {
            return yield parser_1.readSingle();
        },
        write: function* (value) {
            yield parser_1.writeSingle(value);
        }
    },
    [type_templates_1.SerializationTypeCode.String]: {
        read: function* () {
            return yield parser_1.readKleiString();
        },
        write: function* (value) {
            yield parser_1.writeKleiString(value);
        }
    },
    [type_templates_1.SerializationTypeCode.UInt16]: {
        read: function* () {
            return yield parser_1.readUInt16();
        },
        write: function* (value) {
            yield parser_1.writeUInt16(value);
        }
    },
    [type_templates_1.SerializationTypeCode.UInt32]: {
        read: function* () {
            return yield parser_1.readUInt32();
        },
        write: function* (value) {
            yield parser_1.writeUInt32(value);
        }
    },
    [type_templates_1.SerializationTypeCode.UInt64]: {
        read: function* () {
            return yield parser_1.readUInt64();
        },
        write: function* (value) {
            yield parser_1.writeUInt64(value);
        }
    },
    [type_templates_1.SerializationTypeCode.UserDefined]: {
        read: function* (info, templates) {
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
        write: function* (value, info, templates) {
            const templateName = info.typeName;
            if (value == null) {
                yield parser_1.writeInt32(-1);
            }
            else {
                const lengthToken = yield parser_1.writeDataLengthBegin();
                yield* writeByTemplate(templates, templateName, value);
                yield parser_1.writeDataLengthEnd(lengthToken);
            }
        }
    },
    [type_templates_1.SerializationTypeCode.Vector2]: {
        read: function* () {
            const x = yield parser_1.readSingle();
            const y = yield parser_1.readSingle();
            return {
                x,
                y
            };
        },
        write: function* (value) {
            yield parser_1.writeSingle(value.x);
            yield parser_1.writeSingle(value.y);
        }
    },
    [type_templates_1.SerializationTypeCode.Vector2I]: {
        read: function* () {
            const x = yield parser_1.readInt32();
            const y = yield parser_1.readInt32();
            return {
                x,
                y
            };
        },
        write: function* (value) {
            yield parser_1.writeInt32(value.x);
            yield parser_1.writeInt32(value.y);
        }
    },
    [type_templates_1.SerializationTypeCode.Vector3]: {
        read: function* () {
            const x = yield parser_1.readSingle();
            const y = yield parser_1.readSingle();
            const z = yield parser_1.readSingle();
            return {
                x,
                y,
                z
            };
        },
        write: function* (value) {
            yield parser_1.writeSingle(value.x);
            yield parser_1.writeSingle(value.y);
            yield parser_1.writeSingle(value.z);
        }
    }
};
function* parseByType(info, templates) {
    const type = type_templates_1.getTypeCode(info.info);
    const parser = typeParsers[type];
    if (!parser) {
        throw new Error(`Unknown type code "${type}" (typeinfo: "${info.info}").`);
    }
    return yield* parser.read(info, templates);
}
exports.parseByType = parseByType;
function* writeByType(value, info, templates) {
    const type = type_templates_1.getTypeCode(info.info);
    const parser = typeParsers[type];
    if (!parser) {
        throw new Error(`Unknown type code "${type}" (typeinfo: "${info.info}").`);
    }
    return yield* parser.write(value, info, templates);
}
exports.writeByType = writeByType;
function fracToByte(num) {
    const byte = Math.round(num * 255);
    if (byte < 0)
        return 0;
    if (byte > 255)
        return 255;
    return byte;
}
//# sourceMappingURL=type-parser.js.map