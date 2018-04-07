import { DataReader, DataWriter } from "../binary-serializer";
import { TypeReader, TypeWriter } from "../type-templates";
import { OniGameData } from "./services";
export declare class OniGameDataImpl implements OniGameData {
    private _typeReader;
    private _typeWriter;
    private _data;
    constructor(_typeReader: TypeReader, _typeWriter: TypeWriter);
    parse(reader: DataReader): void;
    write(writer: DataWriter): void;
    toJSON(): {};
}
