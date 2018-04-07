/// <reference types="long" />
import Long from "long";
import { TypeDescriptor } from "../../interfaces";
export interface Int64TypeDescriptor extends TypeDescriptor<Long> {
    name: "int-64";
}
