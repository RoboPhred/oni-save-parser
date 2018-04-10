
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
    ArrayTypeDescriptor
} from "./descriptor";


@injectable(TypeSerializationInfo)
@inScope(SaveGameScope)
export class ArrayTypeSerializer implements TypeSerializationInfo<any[] | Uint8Array | null, ArrayTypeDescriptor> {
    readonly id = TypeID.Array;
    readonly name = "array";

    constructor(
        @inject(TypeDescriptorSerializer) private _descriptorSerializer: TypeDescriptorSerializer,
        @inject(TypeSerializer) private _typeSerializer: TypeSerializer
    ) { }

    parseDescriptor(reader: DataReader): ArrayTypeDescriptor {
        // Array does not write its generic count, as it is not
        //  considered a generic to ONI.
        return {
            name: this.name,
            itemType: this._descriptorSerializer.parseDescriptor(reader)
        };
    }

    writeDescriptor(writer: DataWriter, descriptor: ArrayTypeDescriptor): void {
        this._descriptorSerializer.writeDescriptor(writer, descriptor.itemType);
    }

    parseType(reader: DataReader, descriptor: ArrayTypeDescriptor): any[] | Uint8Array | null {
        const elementType = descriptor.itemType;

        // data-length
        //  Note that if length is -1, this is 4 (the length of the count).
        //  If length is >= 0, this is the length of the element
        //  portion, NOT INCLUDING the count.
        reader.readInt32();

        // element-length
        const length = reader.readInt32();
        if (length === -1) {
            return null;
        }
        else if (length >= 0) {
            if (elementType.name === "byte") {
                const data = reader.readBytes(length);
                return new Uint8Array(data);
            }
            else {
                const elements = new Array(length);
                for (let i = 0; i < length; i++) {
                    const element = this._typeSerializer.parseType(reader, elementType);
                    elements[i] = element;
                }

                return elements;
            }
        }
        else {
            throw new Error(`Failed to parse array: Invalid length value of ${length}`);
        }
    }

    writeType(writer: DataWriter, descriptor: ArrayTypeDescriptor, value: any[] | Uint8Array | null): void {
        const elementType = descriptor.itemType;
        
        if (value == null) {
            // ONI inconsistancy: Element count is only included
            //  in the data-length when the array is null.
            writer.writeInt32(4);
            writer.writeInt32(-1);
        }
        else {
            // Despite ONI not making use of the data length, we still calculate it
            //  and store it against the day that it might be used.
            // TODO: Write directly to writer with ability to
            //  retroactively update data length.
            const elementWriter = new ArrayDataWriter();
            if (elementType.name === "byte") {
                if (!(value instanceof Uint8Array)) {
                    throw new Error("Expected byte array value to be Uint8Array.");
                }
                elementWriter.writeBytes(value);
            }
            else {
                for(let element of value) {
                    this._typeSerializer.writeType(elementWriter, elementType, element);
                }
            }

            // ONI inconsistancy: Element count is not included
            //  in the data-length when the array is not null.
            writer.writeInt32(elementWriter.position);
            writer.writeInt32(value.length);
            writer.writeBytes(elementWriter.getBytesView());
        }
    }
};
