
import {
    ArrayDataWriter,
    DataReader,
    DataWriter
} from "../../binary-serializer";

import {
    TypeDescriptor,
    TypeInfo,
    TypeSerializationInfo
} from "../interfaces";

import {
    parse,
    write
} from "../serialization";

import {
    Dictionary
} from "./interfaces";


export interface DictionaryTypeDescriptor<TKey = any, TValue = any> extends TypeDescriptor<Dictionary<TKey, TValue>> {
    name: "dictionary";
    keyType: TypeDescriptor<TKey>;
    valueType: TypeDescriptor<TValue>;
}

export const serializationInfo: TypeSerializationInfo<Dictionary | null, DictionaryTypeDescriptor> = {
    id: TypeInfo.Dictionary,
    name: "dictionary",
    parse(reader: DataReader, descriptor: DictionaryTypeDescriptor): Dictionary | null {
        const {
            keyType,
            valueType
        } = descriptor;

        // data-length.  4 if null.
        reader.readInt32();

        // element-count.  -1 if null.
        const count = reader.readInt32();
        if (count >= 0) {
            let pairs: [any, any][] = new Array(count);

            // Values are parsed first
            for(let i = 0; i < count; i++) {
                pairs[i] = new Array(2) as [any, any];
                pairs[i][1] = parse(reader, valueType);
            }

            for(let i = 0; i < count; i++) {
                pairs[i][0] = parse(reader, keyType);
            }

            return new Map(pairs);
        }
        else {
            return null;
        }
    },
    write(writer: DataWriter, descriptor: DictionaryTypeDescriptor, value: Dictionary | null) {
        if (value == null) {
            // ONI inconsistancy: Element count is only included
            //  in the data-length when the dictionary is null.
            writer.writeInt32(4);
            writer.writeInt32(-1);
        }
        else {
            const {
                keyType,
                valueType
            } = descriptor;
            // Despite ONI not making use of the data length, we still calculate it
            //  and store it against the day that it might be used.
            // TODO: Write directly to writer with ability to
            //  retroactively update data length.
            // TODO: Mantain element order for load/save cycle consistency.
            const dataWriter = new ArrayDataWriter();

            // Values come first.
            for(let element of value) {
                write(dataWriter, valueType, element[1]);
            }
            for(let element of value) {
                write(dataWriter, keyType, element[0]);
            }

            // ONI inconsistancy: Element count is not included
            //  in the data-length when the array is not null.
            writer.writeInt32(dataWriter.position);
            writer.writeInt32(value.size);
            writer.writeBytes(dataWriter.getBytesView());
        }
    }
}