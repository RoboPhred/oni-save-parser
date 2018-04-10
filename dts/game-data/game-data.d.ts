import { DataReader, DataWriter } from "../binary-serializer";
import { TypeTemplateSerializer } from "../type-serializer";
import { OniGameData } from "./services";
export declare class OniGameDataImpl implements OniGameData {
    private _templateSerializer;
    private _data;
    constructor(_templateSerializer: TypeTemplateSerializer);
    parse(reader: DataReader): void;
    write(writer: DataWriter): void;
    toJSON(): {};
}
