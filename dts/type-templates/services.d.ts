import { Identifier } from "microinject";
import { AssemblyTypeName } from "../assembly-types";
import { JsonObjectSerializable } from "../interfaces";
import { BinarySerializable, DataReader, DataWriter } from "../binary-serializer";
export interface TypeRegistryCommonServices {
    /**
     * Indicates if the deserializer can handle the specified type.
     * @param typeName The name of the type to check.
     */
    hasType(typeName: string): boolean;
}
export interface TypeReader extends TypeRegistryCommonServices {
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
    deserializeRawType<T = any>(reader: DataReader, typeName: string): T;
}
export declare const TypeReader: Identifier<TypeReader>;
export interface TypeWriter extends TypeRegistryCommonServices {
    /**
     * Serialize a type to the data writer, including the type name.
     * @param writer The writer to write to.
     * @param value The value to write.
     * @param typeName The name of the type to write the value as.
     */
    serialize<T = any>(writer: DataWriter, typeName: AssemblyTypeName<T>, value: T): void;
    /**
     * Serialize a type to the data writer, without writing the type name.
     * @param writer The writer to write to.
     * @param value The value to write.
     * @param typeName The name of the type to write the value as.
     */
    serializeRawType<T = any>(writer: DataWriter, typeName: AssemblyTypeName<T>, value: T): void;
}
export declare const TypeWriter: Identifier<TypeWriter>;
export interface TypeTemplateRegistry extends JsonObjectSerializable, BinarySerializable, TypeReader, TypeWriter {
}
export declare const TypeTemplateRegistry: Identifier<TypeTemplateRegistry>;
