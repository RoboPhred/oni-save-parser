
import {
    Identifier
} from "microinject";

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
    deserialize(reader: DataReader): object;
}
export const TypeDeserializer: Identifier<TypeDeserializer> = Symbol("TypeDeserializer");
