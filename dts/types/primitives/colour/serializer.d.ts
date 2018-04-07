import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeInfo } from "../../interfaces";
import { TypeSerializationInfo } from "../../services";
import { Colour } from "./interfaces";
import { ColourTypeDescriptor } from "./descriptor";
export declare class ColourTypeSerializer implements TypeSerializationInfo<Colour, ColourTypeDescriptor> {
    readonly id: TypeInfo;
    readonly name: string;
    parse(reader: DataReader, descriptor: ColourTypeDescriptor): Colour;
    write(writer: DataWriter, descriptor: ColourTypeDescriptor, value: Colour): void;
}
