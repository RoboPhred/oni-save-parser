import { DataReader, DataWriter } from "../binary-serializer";
import { TypeSerializer } from "../type-serializer";
import { OniGameData } from "./services";
export declare class OniGameDataImpl implements OniGameData {
    private _typeSerializer;
    private _data;
    constructor(_typeSerializer: TypeSerializer);
    parse(reader: DataReader): void;
    write(writer: DataWriter): void;
    toJSON(): {};
}
