"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    SerializationTypeInfo[SerializationTypeInfo["Colour"] = 22] = "Colour";
    SerializationTypeInfo[SerializationTypeInfo["VALUE_MASK"] = 127] = "VALUE_MASK";
    SerializationTypeInfo[SerializationTypeInfo["IS_GENERIC_TYPE"] = 128] = "IS_GENERIC_TYPE";
})(SerializationTypeInfo = exports.SerializationTypeInfo || (exports.SerializationTypeInfo = {}));
/**
 * An array of SerializationTypeInfo values that are
 * capable of being generic.
 */
exports.GENERIC_TYPES = [
    SerializationTypeInfo.Pair,
    SerializationTypeInfo.Dictionary,
    SerializationTypeInfo.List,
    SerializationTypeInfo.HashSet,
    SerializationTypeInfo.UserDefined
];
//# sourceMappingURL=type-templates.js.map