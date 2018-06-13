"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_templates_1 = require("../save-structure/type-templates");
const utils_1 = require("../utils");
const parser_1 = require("../parser");
function* parseTemplates() {
    const templateCount = yield parser_1.readInt32();
    const templates = new Array(templateCount);
    for (let i = 0; i < templateCount; i++) {
        const template = yield* parseTemplate();
        templates[i] = template;
    }
    return templates;
}
exports.parseTemplates = parseTemplates;
function* parseTemplate() {
    const name = utils_1.validateDotNetIdentifierName(yield parser_1.readKleiString());
    const fieldCount = yield parser_1.readInt32();
    const propCount = yield parser_1.readInt32();
    const fields = new Array(fieldCount);
    for (let i = 0; i < fieldCount; i++) {
        const name = utils_1.validateDotNetIdentifierName(yield parser_1.readKleiString());
        const type = yield* parseTypeInfo();
        fields[i] = {
            name,
            type
        };
    }
    const properties = new Array(propCount);
    for (let i = 0; i < propCount; i++) {
        const name = utils_1.validateDotNetIdentifierName(yield parser_1.readKleiString());
        const type = yield* parseTypeInfo();
        properties[i] = {
            name,
            type
        };
    }
    const template = {
        name,
        fields,
        properties
    };
    return template;
}
function* parseTypeInfo() {
    const info = yield parser_1.readByte();
    const type = info & type_templates_1.SerializationTypeInfo.VALUE_MASK;
    let typeName;
    let subTypes;
    if (type === type_templates_1.SerializationTypeInfo.UserDefined ||
        type === type_templates_1.SerializationTypeInfo.Enumeration) {
        const userTypeName = yield parser_1.readKleiString();
        if (userTypeName === null) {
            throw new Error("Expected non-null type name for user-defined or enumeration type.");
        }
        typeName = userTypeName;
    }
    if (info & type_templates_1.SerializationTypeInfo.IS_GENERIC_TYPE) {
        if (type_templates_1.GENERIC_TYPES.indexOf(type) === -1) {
            throw new Error(`Unsupported non-generic type ${type} marked as generic.`);
        }
        const subTypeCount = yield parser_1.readByte();
        subTypes = new Array(subTypeCount);
        for (let i = 0; i < subTypeCount; i++) {
            subTypes[i] = yield* parseTypeInfo();
        }
    }
    else if (type === type_templates_1.SerializationTypeInfo.Array) {
        const subType = yield* parseTypeInfo();
        subTypes = [subType];
    }
    const typeInfo = {
        info,
        typeName,
        subTypes
    };
    return typeInfo;
}
//# sourceMappingURL=templates.js.map