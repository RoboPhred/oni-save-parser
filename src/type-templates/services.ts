
import {
    Identifier
} from "microinject";

import {
    AssemblyTypeName
} from "../assembly-types";

import {
    JsonObjectSerializable,
    Parseable
} from "../interfaces";

import {
    DataReader
} from "../data-reader";

export interface TypeTemplateRegistry extends JsonObjectSerializable, Parseable { }
export const TypeTemplateRegistry: Identifier<TypeTemplateRegistry> = Symbol("TypeTemplateRegistry");

export interface TypeDeserializer {
    /**
     * Indicates if the deserializer can handle the specified type.
     * @param typeName The name of the type to check.
     */
    hasType(typeName: string): boolean;

    /**
     * Deserialize a named type from the data reader.
     * The type name should be the next item to be read.
     * @param reader The data reader to deserialize from.
     * @param expectedType The type that we should expect to find.  If the declared type does not match, an error is thrown.
     */
    deserialize<T = any>(reader: DataReader): T;

    /**
     * Deserialize a named type from the data reader.
     * The type name should be the next item to be read.
     * The return type is inferred from the expected type.
     * @param reader The data reader to deserialize from.
     * @param expectedType The type that we should expect to find.  If the declared type does not match, an error is thrown.
     */
    deserialize<T>(reader: DataReader, expectedType: AssemblyTypeName<T>): T;

    /**
     * Deserialize a type by explicit name.
     * The type name should *not* be in the data reader.
     * The type name will be looked up and immediately parsed.
     * @param reader The data reader to deserialize from.
     * @param typeName The type to deserialize from the reader.
     */
    deserializeType<T = any>(reader: DataReader, typeName: string): T;
}
export const TypeDeserializer: Identifier<TypeDeserializer> = Symbol("TypeDeserializer");
