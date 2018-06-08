"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VALUE_MASK = 127;
const IS_GENERIC_TYPE = 128;
// Corresponds to the type IDs from ONI SerializationTypeInfo.
//  ONI has a IS_GENERIC_TYPE flag, but in practice only UserDefined can
//  be either.  This is also the only type that has an indeterminate number
//  of sub-types.
// Currently, we treat generic and non-generic with different type infos.
//  This can be improved upon at the cost of a more serializer info contract
//  by allowing an info object to specify if it supports generics, and
//  making the master serializer strip out the
var TypeID;
(function (TypeID) {
    // This is currently the only type that has generic and non-generic support.
    //  We can treat it as two seperate types.
    TypeID[TypeID["UserDefined"] = 0] = "UserDefined";
    TypeID[TypeID["UserDefinedGeneric"] = 0 | IS_GENERIC_TYPE] = "UserDefinedGeneric";
    TypeID[TypeID["SByte"] = 1] = "SByte";
    TypeID[TypeID["Byte"] = 2] = "Byte";
    TypeID[TypeID["Boolean"] = 3] = "Boolean";
    TypeID[TypeID["Int16"] = 4] = "Int16";
    TypeID[TypeID["UInt16"] = 5] = "UInt16";
    TypeID[TypeID["Int32"] = 6] = "Int32";
    TypeID[TypeID["UInt32"] = 7] = "UInt32";
    TypeID[TypeID["Int64"] = 8] = "Int64";
    TypeID[TypeID["UInt64"] = 9] = "UInt64";
    TypeID[TypeID["Single"] = 10] = "Single";
    TypeID[TypeID["Double"] = 11] = "Double";
    TypeID[TypeID["String"] = 12] = "String";
    TypeID[TypeID["Enumeration"] = 13] = "Enumeration";
    TypeID[TypeID["Vector2I"] = 14] = "Vector2I";
    TypeID[TypeID["Vector2"] = 15] = "Vector2";
    TypeID[TypeID["Vector3"] = 16] = "Vector3";
    TypeID[TypeID["Array"] = 17] = "Array";
    // These 4 are always generic.  ONI does not have code to deal with them
    //  in non-generic form.
    // If they are ever added, we could add the serialization info objects for them.
    TypeID[TypeID["Pair"] = 18 | IS_GENERIC_TYPE] = "Pair";
    TypeID[TypeID["Dictionary"] = 19 | IS_GENERIC_TYPE] = "Dictionary";
    TypeID[TypeID["List"] = 20 | IS_GENERIC_TYPE] = "List";
    TypeID[TypeID["HashSet"] = 21 | IS_GENERIC_TYPE] = "HashSet";
    TypeID[TypeID["Colour"] = 22] = "Colour";
})(TypeID = exports.TypeID || (exports.TypeID = {}));
/*
export enum TypeInfo {
    UserDefined = 0,
    SByte = 1,
    Byte = 2,
    Boolean = 3,
    Int16 = 4,
    UInt16 = 5,
    Int32 = 6,
    UInt32 = 7,
    Int64 = 8,
    UInt64 = 9,
    Single = 10,
    Double = 11,
    String = 12,
    Enumeration = 13,
    Vector2I = 14,
    Vector2 = 15,
    Vector3 = 16,
    Array = 17,
    Pair = 18,
    Dictionary = 19,
    List = 20,
    HashSet = 21,
    Colour = 22,
    VALUE_MASK = 127,
    IS_GENERIC_TYPE = 128,
};
*/
//# sourceMappingURL=interfaces.js.map