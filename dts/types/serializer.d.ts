import { DataReader, DataWriter } from "../binary-serializer";
import { TypeDescriptor } from "./interfaces";
import { TypeSerializer, TypeSerializationInfo } from "./services";
export declare class TypeSerializerImpl implements TypeSerializer {
    serializerInfos: TypeSerializationInfo[] | undefined;
    private _infoByName;
    private _infoByType;
    parse<T>(reader: DataReader, descriptor: TypeDescriptor<T>): T;
    write<T>(writer: DataWriter, descriptor: TypeDescriptor<T>, value: T): void;
    private _getSerializationInfo(descriptor);
    private _buildCache();
}
