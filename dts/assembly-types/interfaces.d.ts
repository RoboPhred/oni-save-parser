/**
 * Represents the name of a type in the ONI assemboly.
 *
 * This exists as a typescript type lookup helper.
 * It is used to look up the underlying type interface
 * when the name is passed to deserializers.
 * This provides compile-time safety and code completion
 * when working with the types by name.
 *
 * Traditionally we would use a simple ```type Foo<T> = string```,
 * but typescript is too aggressive at erasing our generic which
 * prevents the type inferencing we desire.
 * In order to ensure the type data is kept, we blend in a key that
 * makes reference to the type, forcing typescript to keep it around.
 */
export declare type AssemblyTypeName<T> = string & {
    __assemblyTypeMetadata?: T & never;
};
