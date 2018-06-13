"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_templates_1 = require("../save-structure/type-templates");
const utils_1 = require("../utils");
function parseTemplates(reader) {
    const templateCount = reader.readInt32();
    const templates = new Array(templateCount);
    for (let i = 0; i < templateCount; i++) {
        const template = parseTemplate(reader);
        templates[i] = template;
    }
    return templates;
}
exports.parseTemplates = parseTemplates;
function parseTemplate(reader) {
    const name = utils_1.validateDotNetIdentifierName(reader.readKleiString());
    const fieldCount = reader.readInt32();
    const propCount = reader.readInt32();
    const fields = new Array(fieldCount);
    for (let i = 0; i < fieldCount; i++) {
        const name = utils_1.validateDotNetIdentifierName(reader.readKleiString());
        const type = parseTypeInfo(reader);
        fields[i] = {
            name,
            type
        };
    }
    const properties = new Array(propCount);
    for (let i = 0; i < propCount; i++) {
        const name = utils_1.validateDotNetIdentifierName(reader.readKleiString());
        const type = parseTypeInfo(reader);
        properties[i] = {
            name,
            type
        };
    }
    return {
        name,
        fields,
        properties
    };
}
function parseTypeInfo(reader) {
    const info = reader.readByte();
    const type = info & type_templates_1.SerializationTypeInfo.VALUE_MASK;
    let typeName;
    let subTypes;
    if (type === type_templates_1.SerializationTypeInfo.UserDefined ||
        type === type_templates_1.SerializationTypeInfo.Enumeration) {
        const userTypeName = reader.readKleiString();
        if (userTypeName === null) {
            throw new Error("Expected non-null type name for user-defined or enumeration type.");
        }
        typeName = userTypeName;
    }
    if (info & type_templates_1.SerializationTypeInfo.IS_GENERIC_TYPE) {
        if (type_templates_1.GENERIC_TYPES.indexOf(type) === -1) {
            throw new Error(`Unsupported non-generic type ${type} marked as generic.`);
        }
        const subTypeCount = reader.readByte();
        subTypes = new Array(subTypeCount);
        for (let i = 0; i < subTypeCount; i++) {
            subTypes[i] = parseTypeInfo(reader);
        }
    }
    else if (type === type_templates_1.SerializationTypeInfo.Array) {
        const subType = parseTypeInfo(reader);
        subTypes = [subType];
    }
    return {
        info,
        typeName,
        subTypes
    };
}
//# sourceMappingURL=templates.js.map