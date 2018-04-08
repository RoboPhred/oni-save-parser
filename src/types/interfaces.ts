import {
    DataReader,
    DataWriter
} from "../binary-serializer";

export interface TypeDescriptor<T = any> {
    name: string;
}

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
export enum TypeID {
    // This is currently the only type that has generic and non-generic support.
    //  We can treat it as two seperate types.
    UserDefined = 0,
    UserDefinedGeneric = 0 | IS_GENERIC_TYPE,

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

    // These 4 are always generic.  ONI does not have code to deal with them
    //  in non-generic form.
    // If they are ever added, we could add the serialization info objects for them.
    Pair = 18 | IS_GENERIC_TYPE,
    Dictionary = 19 | IS_GENERIC_TYPE,
    List = 20 | IS_GENERIC_TYPE,
    HashSet = 21 | IS_GENERIC_TYPE,

    Colour = 22
};

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
