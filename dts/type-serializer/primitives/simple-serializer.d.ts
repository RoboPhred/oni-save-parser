import { DataReader, DataWriter } from "../../binary-serializer";
import { TypeSerializationInfo } from "../services";
import { TypeID, TypeDescriptor } from "../interfaces";
export declare type TypeSerializationInfoClass = {
    new (...args: any[]): TypeSerializationInfo;
};
export declare function createSimpleSerializationInfo<T, TDescriptor extends TypeDescriptor<T>>(id: TypeID, name: TDescriptor["name"], parse: ((reader: DataReader) => T), write: ((writer: DataWriter, value: T) => void)): TypeSerializationInfoClass;
