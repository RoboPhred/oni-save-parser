import { DataReader } from "./data-reader";
export interface JsonObjectSerializable {
    toJSON(): object;
}
export interface Parseable {
    parse(reader: DataReader): void;
}
