
import {
    Container
} from "microinject";

import {
    ArrayDataReader,
    ArrayDataWriter
} from "../../binary-serializer";

import {
    OniSave
} from "../../oni-save";

import parserModule from "./module";

export function parseOniSave(data: ArrayBuffer): OniSave {
    const container = new Container();
    container.load(parserModule);
    const save = container.get(OniSave);
    const reader = new ArrayDataReader(data);
    save.parse(reader);
    return save;
}

export function writeOniSave(save: OniSave): ArrayBuffer {
    const writer = new ArrayDataWriter();
    save.write(writer);
    return writer.getBytes();
}