/**
 * A template describing how to
 * serialize or deserializea .NET class.
 *
 * Namespace: "KSerialization"
 * Class: "DeserializationTemplate"
 * Parser: "new DeserializationTemplate(string templateName, IReader reader)"
 *
 * Parse Instructions:
 * ```
 * fieldCount = parse Int32
 * propertyCount = parse Int32
 *
 * for each fieldCount do
 *  fieldNameLength = parse Int32
 *  fieldName = parse Bytes[fieldNameLength] as string(utf-8)
 *  field = parse TypeTemplateMember
 *  add field to fields
 * end
 *
 * for each propertyCount do
 *  propertyNameLength = parse Int32
 *  propertyName = parse Bytes[propertyNameLength] as string(utf-8)
 *  property = parse TypeTemplateMember
 *  add property to properties
 * end
 * ```
 */
export interface TypeTemplate {
    /**
     * The .NET class name this type describes.
     * This can be a short or full class name, with or without assembly.
     * For the context of this name, the default assembly is Assembly-CSharp.dll.
     *
     * Field: "typeName"
     * Parser: none - passed to constructor.
     */
    name: string;
    /**
     * All field members of this .NET class, in order of serialization.
     */
    fields: TypeTemplateMember[];
    /**
     * All property members of this .NET class, in order of serialization.
     */
    properties: TypeTemplateMember[];
}
/**
 * Describes a field or property for a .NET Class type template.
 *
 * Namespace: "KSerialization"
 * Class: "DeserializationTemplate+SerializedInfo"
 */
export interface TypeTemplateMember {
    /**
     * The name of the field or property.
     */
    name: string;
    /**
     * Information describing the field or property.
     */
    type: TypeDescriptor;
}
/**
 * Describes a parseable type.
 * This provides a base interface, and may contain
 * additional data depending on the type in question.
 *
 * This is analogous to [KSerialization].SerializationTypeInfo,
 * but provides a human-readable name in place of a numeric ID.
 */
export interface TypeDescriptor<T = any> {
    /**
     * The friendly name of the type.
     */
    name: string;
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
