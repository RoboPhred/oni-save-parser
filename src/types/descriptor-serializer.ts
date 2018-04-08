
import {
    injectable
} from "microinject";


import {
    DataReader,
    DataWriter
} from "../binary-serializer";


import {
    TypeDescriptor
} from "./interfaces";

import {
    TypeDescriptorSerializer
} from "./services";


@injectable(TypeDescriptorSerializer)
export class TypeDescriptorSerializerImpl implements TypeDescriptorSerializer {
    parseDescriptor(reader: DataReader): TypeDescriptor<any> {
        throw new Error("Method not implemented.");
    }

    writeDescriptor(writer: DataWriter, descriptor: TypeDescriptor<any>): void {
        throw new Error("Method not implemented.");
    }
}