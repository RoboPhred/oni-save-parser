
import {
    injectable,
    inject,
    provides,
    singleton
} from "microinject"

import {
    DataReader,
    DataWriter
} from "../binary-serializer";

import {
    TypeDescriptor,
    TypeID
} from "./interfaces";

import {
    TypeSerializer,
    TypeSerializationInfo,
    TypeTemplateRegistry,
    TypeDescriptorSerializer
} from "./services";


@injectable()
@provides(TypeSerializer)
@provides(TypeDescriptorSerializer)
@singleton()
export class TypeSerializerImpl implements TypeSerializer, TypeDescriptorSerializer {

    // Some types are recursive, and need to access the TypeSerializer.
    //  To support this, we need to late-inject the serializers by property
    //  injection.  This avoids the circular dependency that would
    //  occur if we used constructor injection.
    // Note that we must be a singleton to avoid this circular dependency.
    // TODO: Add setter injection support to microinject and use that.
    //  Store as map<TypeInfo, serializer>.
    @inject(TypeSerializationInfo, {all: true})
    public _serializerInfos: TypeSerializationInfo[] | undefined;

    @inject(TypeTemplateRegistry)
    public _templateRegistry: TypeTemplateRegistry | undefined;
    

    private _infoByName = new Map<string, TypeSerializationInfo>();
    private _infoByType = new Map<TypeID, TypeSerializationInfo>();

    parseDescriptor(reader: DataReader): TypeDescriptor {
        this._buildCache();

        const id = reader.readByte();
        const type = this._infoByType.get(id);
        if (!type) {
            throw new Error(`Failed to parse type descriptor: Type ID ${id} has no registered serialization info.`);
        }

        const descriptor = type.parseDescriptor(reader);
        return descriptor;
    }

    writeDescriptor(writer: DataWriter, descriptor: TypeDescriptor): void {
        this._buildCache();

        const name = descriptor.name;
        const type = this._infoByName.get(name);
        if (!type) {
            throw new Error(`Failed to write type descriptor: Descriptor name ${name} has no registered serialization info.`);
        }

        writer.writeByte(type.id);
        type.writeDescriptor(writer, descriptor);
    }

    parseType<T>(reader: DataReader, descriptor: TypeDescriptor<T>): T {
        const serializer = this._getSerializationInfo(descriptor);
        return serializer.parseType(reader, descriptor);
    }

    writeType<T>(writer: DataWriter, descriptor: TypeDescriptor<T>, value: T): void {
        const serializer = this._getSerializationInfo(descriptor);
        serializer.writeType(writer, descriptor, value);
    }

    hasTemplatedType(templateName: string): boolean {
        return this._templateRegistry!.has(templateName);
    }

    private _getSerializationInfo(descriptor: TypeDescriptor): TypeSerializationInfo {
        if (!this._serializerInfos) {
            throw new Error("Serialization info objects have not been provided.");
        }

        this._buildCache();

        const serializer = this._infoByName.get(descriptor.name);
        if (!serializer) {
            throw new Error(`No serializer exists for type "${descriptor.name}".`);
        }

        return serializer;
    }

    private _buildCache() {
        if (!this._serializerInfos || this._infoByName.size !== 0) {
            return;
        }

        for (let info of this._serializerInfos) {
            if (this._infoByName.has(info.name)) {
                throw new Error(`Duplicate serializer type info name: "${info.name}".`);
            }
            this._infoByName.set(info.name, info);

            const lastIdDefiner = this._infoByType.get(info.id);
            if (lastIdDefiner !== undefined) {
                throw new Error(`Duplicate serializer type info ID: ${info.id} from name "${info.name}" (defined by "${lastIdDefiner.name}").`);
            }
            this._infoByType.set(info.id, info);
        }
    }
}