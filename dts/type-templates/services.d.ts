import { Identifier } from "microinject";
import { JsonObjectSerializable, Parseable } from "../interfaces";
import { DataReader } from "../data-reader";
export interface TypeTemplateRegistry extends JsonObjectSerializable, Parseable {
}
export declare const TypeTemplateRegistry: Identifier<TypeTemplateRegistry>;
export interface TypeDeserializer {
    deserialize(reader: DataReader): object;
}
export declare const TypeDeserializer: Identifier<TypeDeserializer>;
