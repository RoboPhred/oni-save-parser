
import {
    DataReader,
    DataWriter
} from "../../binary-serializer";

import {
    TypeDescriptor,
    TypeInfo,
    TypeSerializationInfo
} from "../interfaces";

import {
    Colour
} from "./interfaces";


export const serializationInfo: TypeSerializationInfo<Colour> = {
    id: TypeInfo.Colour,
    name: "colour",
    parse(reader: DataReader, descriptor: TypeDescriptor): Colour {
        return {
            r: reader.readByte() / 255,
            g: reader.readByte() / 255,
            b: reader.readByte() / 255,
            a: reader.readByte() / 255,
        };
    },
    write(writer: DataWriter, descriptor: TypeDescriptor, value: Colour): void {
        writer.writeByte(fracToByte(value.r));
        writer.writeByte(fracToByte(value.g));
        writer.writeByte(fracToByte(value.b));
        writer.writeByte(fracToByte(value.a));
    }
};

function fracToByte(num: number): number {
    const byte = Math.round(num * 255);
    if (byte < 0) return 0;
    if (byte > 255) return 255;

    return byte;
}