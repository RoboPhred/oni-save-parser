
import {
    injectable,
    inject,
    inScope
} from "microinject";


import {
    ArrayDataWriter,
    DataReader,
    DataWriter
} from "../../../../../binary-serializer";

import {
    SaveGameScope
} from "../../../services";

import {
    TypeID
} from "../../interfaces";

import {
    TypeSerializer,
    TypeSerializationInfo,
    TypeDescriptorSerializer
} from "../../services";


import {
    Pair
} from "./interfaces";

import {
    PairTypeDescriptor
} from "./descriptor";


@injectable(TypeSerializationInfo)
@inScope(SaveGameScope)
export class PairTypeSerializer implements TypeSerializationInfo<Pair | null, PairTypeDescriptor> {
    readonly id = TypeID.Pair;
    readonly name = "pair";

    constructor(
        @inject(TypeDescriptorSerializer) private _descriptorSerializer: TypeDescriptorSerializer,
        @inject(TypeSerializer) private _typeSerializer: TypeSerializer
    ) { }

    parseDescriptor(reader: DataReader): PairTypeDescriptor {
        const subTypeCount = reader.readByte();
        if (subTypeCount !== 2) {
            // Note: We are being stricter here than the ONI code.
            //  Technically they can handle more than 2 sub-types, if that
            //  ends up getting written out.
            throw new Error("Pair types require 2 sub-types.");
        }
        
        return {
            name: this.name,
            keyType: this._descriptorSerializer.parseDescriptor(reader),
            valueType: this._descriptorSerializer.parseDescriptor(reader)
        }
    }

    writeDescriptor(writer: DataWriter, descriptor: PairTypeDescriptor) {
        writer.writeByte(2);
        this._descriptorSerializer.writeDescriptor(writer, descriptor.keyType);
        this._descriptorSerializer.writeDescriptor(writer, descriptor.valueType);
    }

    // ONI BUG:
    //  On null pair, ONI writes out [4, -1], as if it was
    //  writing out null to a variable-length collection.
    // However, it checks for a first value >= 0 to indicate not-null,
    //  meaning it will parse a null as not-null and get the parser
    //  into an incorrect state.
    // We reproduce the faulty behavior here to remain accurate to ONI.

    parseType(reader: DataReader, descriptor: PairTypeDescriptor): Pair | null {
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
                key: this._typeSerializer.parseType(reader, keyType),
                value: this._typeSerializer.parseType(reader, valueType)
            };
        }
        else {
            return null;
        }
    }

    writeType(writer: DataWriter, descriptor: PairTypeDescriptor, value: Pair | null): void {
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
            this._typeSerializer.writeType(dataWriter, keyType, value.key);
            this._typeSerializer.writeType(dataWriter, valueType, value.value);

            writer.writeInt32(dataWriter.position);
            writer.writeBytes(dataWriter.getBytesView());
        }
    }
};