
import {
    injectable,
    inject,
    singleton
} from "microinject"

import {
    DataReader,
    DataWriter
} from "../binary-serializer";


import {
    TypeDescriptor,
    TypeInfo
} from "./interfaces";

import {
    TypeSerializer, TypeSerializationInfo
} from "./services";


@injectable()
@singleton()
export class TypeSerializerImpl implements TypeSerializer {

    // Some types are recursive, and need to access the TypeSerializer.
    //  To support this, we need to late-inject the serializers by property
    //  injection.  This avoids the circular dependency that would
    //  occur if we used constructor injection.
    // Note that we must be a singleton to avoid this circular dependency.
    // TODO: Add setter injection support to microinject and use that.
    //  Store as map<TypeInfo, serializer>.
    @inject(TypeSerializationInfo, {all: true})
    public serializerInfos: TypeSerializationInfo[] | undefined;

    private _infoByName = new Map<string, TypeSerializationInfo>();
    private _infoByType = new Map<TypeInfo, TypeSerializationInfo>();

    parse<T>(reader: DataReader, descriptor: TypeDescriptor<T>): T {
        const serializer = this._getSerializationInfo(descriptor);
        return serializer.parse(reader, descriptor);
    }

    write<T>(writer: DataWriter, descriptor: TypeDescriptor<T>, value: T): void {
        const serializer = this._getSerializationInfo(descriptor);
        serializer.write(writer, descriptor, value);
    }

    private _getSerializationInfo(descriptor: TypeDescriptor): TypeSerializationInfo {
        if (!this.serializerInfos) {
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
        if (!this.serializerInfos || this._infoByName.size !== 0) {
            return;
        }

        for (let info of this.serializerInfos) {
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