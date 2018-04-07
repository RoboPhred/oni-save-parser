/// <reference types="long" />
import Long from "long";
import { TypeDescriptor } from "../../interfaces";
export interface UInt64TypeDescriptor extends TypeDescriptor<Long> {
    name: "int-64-unsigned";
}
