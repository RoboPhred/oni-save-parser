"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unparseTypeInfo = exports.parseTypeInfo = void 0;
const type_templates_1 = require("../../save-structure/type-templates");
const parser_1 = require("../../parser");
function* parseTypeInfo() {
    const info = yield parser_1.readByte();
    const type = type_templates_1.getTypeCode(info);
    let templateName;
    let subTypes;
    if (type === type_templates_1.SerializationTypeCode.UserDefined ||
        type === type_templates_1.SerializationTypeCode.Enumeration) {
        const userTypeName = yield parser_1.readKleiString();
        if (userTypeName == null) {
            throw new Error("Expected non-null type name for user-defined or enumeration type.");
        }
        templateName = userTypeName;
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
    else if (type === type_templates_1.SerializationTypeCode.Array) {
        const subType = yield* parseTypeInfo();
        subTypes = [subType];
    }
    const typeInfo = {
        info,
        templateName,
        subTypes
    };
    return typeInfo;
}
exports.parseTypeInfo = parseTypeInfo;
function* unparseTypeInfo(info) {
    yield parser_1.writeByte(info.info);
    const type = type_templates_1.getTypeCode(info.info);
    if (type === type_templates_1.SerializationTypeCode.UserDefined ||
        type === type_templates_1.SerializationTypeCode.Enumeration) {
        yield parser_1.writeKleiString(info.templateName);
    }
    if (info.info & type_templates_1.SerializationTypeInfo.IS_GENERIC_TYPE) {
        yield parser_1.writeByte(info.subTypes.length);
        for (const subType of info.subTypes) {
            yield* unparseTypeInfo(subType);
        }
    }
    else if (type === type_templates_1.SerializationTypeCode.Array) {
        yield* unparseTypeInfo(info.subTypes[0]);
    }
}
exports.unparseTypeInfo = unparseTypeInfo;
//# sourceMappingURL=type-info-parser.js.map