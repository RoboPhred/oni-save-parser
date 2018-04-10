import { DataReader, DataWriter } from "../binary-serializer";
import { TypeDescriptor } from "./interfaces";
import { TypeSerializer, TypeSerializationInfo, TypeTemplateRegistry, TypeDescriptorSerializer } from "./services";
export declare class TypeSerializerImpl implements TypeSerializer, TypeDescriptorSerializer {
    _serializerInfos: TypeSerializationInfo[] | undefined;
    _templateRegistry: TypeTemplateRegistry | undefined;
    private _infoByName;
    private _infoByType;
    parseDescriptor(reader: DataReader): TypeDescriptor;
    writeDescriptor(writer: DataWriter, descriptor: TypeDescriptor): void;
    parseType<T>(reader: DataReader, descriptor: TypeDescriptor<T>): T;
    writeType<T>(writer: DataWriter, descriptor: TypeDescriptor<T>, value: T): void;
    hasTemplatedType(templateName: string): boolean;
    parseTemplatedType<T extends object = any>(reader: DataReader, templateName: string): T;
    writeTemplatedType<T extends object = any>(writer: DataWriter, templateName: string, value: T): void;
    private _getSerializationInfo(descriptor);
    private _buildCache();
}
