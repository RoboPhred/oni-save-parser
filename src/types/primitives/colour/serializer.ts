
import {
    injectable,
    singleton
} from "microinject";

import {
    DataReader,
    DataWriter
} from "../../../binary-serializer";

import {
    TypeInfo
} from "../../interfaces";

import {
    TypeSerializationInfo
} from "../../services";


import {
    Colour
} from "./interfaces";

import {
    ColourTypeDescriptor
} from "./descriptor";


@injectable(TypeSerializationInfo)
@singleton()
export class ColourTypeSerializer implements TypeSerializationInfo<Colour, ColourTypeDescriptor> {
    readonly id = TypeInfo.Colour;
    readonly name = "colour";

    parse(reader: DataReader, descriptor: ColourTypeDescriptor): Colour {
        return {
            r: reader.readByte() / 255,
            g: reader.readByte() / 255,
            b: reader.readByte() / 255,
            a: reader.readByte() / 255,
        };
    }

    write(writer: DataWriter, descriptor: ColourTypeDescriptor, value: Colour): void {
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