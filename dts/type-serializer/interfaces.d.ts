export interface TypeDescriptor<T = any> {
    name: string;
}
export interface TypeTemplate {
    fields: TypeTemplateMember[];
    properties: TypeTemplateMember[];
}
export interface TypeTemplateMember {
    name: string;
    type: TypeDescriptor;
}
export declare enum TypeID {
    UserDefined = 0,
    UserDefinedGeneric,
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
    Pair,
    Dictionary,
    List,
    HashSet,
    Colour = 22,
}
