
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
import { Pair } from ".";

export interface PairTypeDescriptor<TKey = any, TValue = any> extends TypeDescriptor<Pair<TKey, TValue>> {
    name: "pair";
    keyType: TypeDescriptor<TKey>;
    valueType: TypeDescriptor<TValue>;
}

export const serializationInfo: TypeSerializationInfo<Pair | null, PairTypeDescriptor> = {
    id: TypeInfo.Array,
    name: "array",

    // ONI BUG:
    //  On null pair, ONI writes out [4, -1], as if it was
    //  writing out null to a variable-length collection.
    // However, it checks for a first value >= 0 to indicate not-null,
    //  meaning it will parse a null as not-null and get the parser
    //  into an incorrect state.
    // We reproduce the faulty behavior here to remain accurate to ONI.

    parse(reader: DataReader, descriptor: PairTypeDescriptor): Pair | null {
        // Writer mirrors ONI code and writes unparsable data.  See ONI bug description above.
        const dataLength = reader.readInt32();
        if (dataLength >= 0) {
            // Trying to parse a data length of 0 makes no sense,
            //  but we are following ONI code.  Do not change this logic.
            //  See ONI bug description above.
            const {
                keyType,
                valueType
            } = descriptor;
            return {
                key: parse(reader, keyType),
                value: parse(reader, valueType)
            };
        }
        else {
            return null;
        }
    },
    write(writer: DataWriter, descriptor: PairTypeDescriptor, value: Pair | null): void {
        // Writer mirrors ONI code and writes unparsable data.  See ONI bug description above.
        if (value == null) {
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
            const dataWriter = new ArrayDataWriter();
            write(dataWriter, keyType, value.key);
            write(dataWriter, valueType, value.value);

            writer.writeInt32(dataWriter.position);
            writer.writeBytes(dataWriter.getBytesView());
        }
    }
};