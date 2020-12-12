"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LIST_TYPES = exports.GENERIC_TYPES = exports.isValueType = exports.getTypeCode = exports.SerializationTypeCode = exports.SerializationTypeInfo = void 0;
/**
 * Namespace: "KSerialization"
 * Class: "SerializationTypeInfo"
 */
var SerializationTypeInfo;
(function (SerializationTypeInfo) {
    SerializationTypeInfo[SerializationTypeInfo["UserDefined"] = 0] = "UserDefined";
    SerializationTypeInfo[SerializationTypeInfo["SByte"] = 1] = "SByte";
    SerializationTypeInfo[SerializationTypeInfo["Byte"] = 2] = "Byte";
    SerializationTypeInfo[SerializationTypeInfo["Boolean"] = 3] = "Boolean";
    SerializationTypeInfo[SerializationTypeInfo["Int16"] = 4] = "Int16";
    SerializationTypeInfo[SerializationTypeInfo["UInt16"] = 5] = "UInt16";
    SerializationTypeInfo[SerializationTypeInfo["Int32"] = 6] = "Int32";
    SerializationTypeInfo[SerializationTypeInfo["UInt32"] = 7] = "UInt32";
    SerializationTypeInfo[SerializationTypeInfo["Int64"] = 8] = "Int64";
    SerializationTypeInfo[SerializationTypeInfo["UInt64"] = 9] = "UInt64";
    SerializationTypeInfo[SerializationTypeInfo["Single"] = 10] = "Single";
    SerializationTypeInfo[SerializationTypeInfo["Double"] = 11] = "Double";
    SerializationTypeInfo[SerializationTypeInfo["String"] = 12] = "String";
    SerializationTypeInfo[SerializationTypeInfo["Enumeration"] = 13] = "Enumeration";
    SerializationTypeInfo[SerializationTypeInfo["Vector2I"] = 14] = "Vector2I";
    SerializationTypeInfo[SerializationTypeInfo["Vector2"] = 15] = "Vector2";
    SerializationTypeInfo[SerializationTypeInfo["Vector3"] = 16] = "Vector3";
    SerializationTypeInfo[SerializationTypeInfo["Array"] = 17] = "Array";
    SerializationTypeInfo[SerializationTypeInfo["Pair"] = 18] = "Pair";
    SerializationTypeInfo[SerializationTypeInfo["Dictionary"] = 19] = "Dictionary";
    SerializationTypeInfo[SerializationTypeInfo["List"] = 20] = "List";
    SerializationTypeInfo[SerializationTypeInfo["HashSet"] = 21] = "HashSet";
    SerializationTypeInfo[SerializationTypeInfo["Queue"] = 22] = "Queue";
    SerializationTypeInfo[SerializationTypeInfo["Colour"] = 23] = "Colour";
    SerializationTypeInfo[SerializationTypeInfo["VALUE_MASK"] = 63] = "VALUE_MASK";
    SerializationTypeInfo[SerializationTypeInfo["IS_VALUE_TYPE"] = 64] = "IS_VALUE_TYPE";
    SerializationTypeInfo[SerializationTypeInfo["IS_GENERIC_TYPE"] = 128] = "IS_GENERIC_TYPE";
})(SerializationTypeInfo = exports.SerializationTypeInfo || (exports.SerializationTypeInfo = {}));
var SerializationTypeCode;
(function (SerializationTypeCode) {
    SerializationTypeCode[SerializationTypeCode["UserDefined"] = 0] = "UserDefined";
    SerializationTypeCode[SerializationTypeCode["SByte"] = 1] = "SByte";
    SerializationTypeCode[SerializationTypeCode["Byte"] = 2] = "Byte";
    SerializationTypeCode[SerializationTypeCode["Boolean"] = 3] = "Boolean";
    SerializationTypeCode[SerializationTypeCode["Int16"] = 4] = "Int16";
    SerializationTypeCode[SerializationTypeCode["UInt16"] = 5] = "UInt16";
    SerializationTypeCode[SerializationTypeCode["Int32"] = 6] = "Int32";
    SerializationTypeCode[SerializationTypeCode["UInt32"] = 7] = "UInt32";
    SerializationTypeCode[SerializationTypeCode["Int64"] = 8] = "Int64";
    SerializationTypeCode[SerializationTypeCode["UInt64"] = 9] = "UInt64";
    SerializationTypeCode[SerializationTypeCode["Single"] = 10] = "Single";
    SerializationTypeCode[SerializationTypeCode["Double"] = 11] = "Double";
    SerializationTypeCode[SerializationTypeCode["String"] = 12] = "String";
    SerializationTypeCode[SerializationTypeCode["Enumeration"] = 13] = "Enumeration";
    SerializationTypeCode[SerializationTypeCode["Vector2I"] = 14] = "Vector2I";
    SerializationTypeCode[SerializationTypeCode["Vector2"] = 15] = "Vector2";
    SerializationTypeCode[SerializationTypeCode["Vector3"] = 16] = "Vector3";
    SerializationTypeCode[SerializationTypeCode["Array"] = 17] = "Array";
    SerializationTypeCode[SerializationTypeCode["Pair"] = 18] = "Pair";
    SerializationTypeCode[SerializationTypeCode["Dictionary"] = 19] = "Dictionary";
    SerializationTypeCode[SerializationTypeCode["List"] = 20] = "List";
    SerializationTypeCode[SerializationTypeCode["HashSet"] = 21] = "HashSet";
    SerializationTypeCode[SerializationTypeCode["Queue"] = 22] = "Queue";
    SerializationTypeCode[SerializationTypeCode["Colour"] = 23] = "Colour";
})(SerializationTypeCode = exports.SerializationTypeCode || (exports.SerializationTypeCode = {}));
// TODO: This needs to be changed based on the current version due to cosmos update changing the VALUE_MASK constant.
function getTypeCode(type) {
    return type & SerializationTypeInfo.VALUE_MASK;
}
exports.getTypeCode = getTypeCode;
function isValueType(type) {
    return Boolean(type & SerializationTypeInfo.IS_VALUE_TYPE);
}
exports.isValueType = isValueType;
/**
 * An array of SerializationTypeInfo values that are
 * capable of being generic.
 */
exports.GENERIC_TYPES = [
    SerializationTypeCode.Pair,
    SerializationTypeCode.Dictionary,
    SerializationTypeCode.List,
    SerializationTypeCode.HashSet,
    SerializationTypeCode.UserDefined,
    SerializationTypeCode.Queue
];
exports.LIST_TYPES = [
    SerializationTypeCode.Array,
    SerializationTypeCode.List,
    SerializationTypeCode.HashSet,
    SerializationTypeCode.Queue
];
//# sourceMappingURL=type-templates.js.map