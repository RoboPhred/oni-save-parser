import { DataReader, DataWriter } from "../binary-serializer";
import { TypeDescriptor } from "./interfaces";
import { TypeDescriptorSerializer } from "./services";
export declare class TypeDescriptorSerializerImpl implements TypeDescriptorSerializer {
    parseDescriptor(reader: DataReader): TypeDescriptor<any>;
    writeDescriptor(writer: DataWriter, descriptor: TypeDescriptor<any>): void;
}
