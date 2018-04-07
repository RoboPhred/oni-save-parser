
import {
    DataReader,
    DataWriter
} from "../binary-serializer";

import {
    TypeDescriptor
} from "./interfaces";


export function parse<T>(reader: DataReader, descriptor: TypeDescriptor<T>): T {
    throw new Error("Not implemented.");
}

export function write<T>(writer: DataWriter, descriptor: TypeDescriptor<T>, value: T): void {
    throw new Error("Not implemented.");
}