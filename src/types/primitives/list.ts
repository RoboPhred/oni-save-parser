
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

export interface ListTypeDescriptor<T = any> extends TypeDescriptor<T[]>{
    name: "array",
    /**
     *  Item type should be a descriptor describing the element
     * of the supplied array type.
     */
    itemType: TypeDescriptor<T>
}

export const serializationInfo: TypeSerializationInfo<any[] | null, ListTypeDescriptor> = {
    id: TypeInfo.List,
    name: "list",
    parse(reader: DataReader, descriptor: ListTypeDescriptor): any[] | null {
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
                return Array.from(new Uint8Array(data));
            }
            else {
                const elements = new Array(length);
                for (let i = 0; i < length; i++) {
                    const element = parse(reader, elementType);
                    elements[i] = element;
                }

                return elements;
            }
        }
        else {
            throw new Error(`Failed to parse array: Invalid length value of ${length}`);
        }
    },
    write(writer: DataWriter, descriptor: ListTypeDescriptor, value: any[] | null): void {
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
            for(let element of value) {
                write(elementWriter, elementType, element);
            }

            // ONI inconsistancy: Element count is not included
            //  in the data-length when the array is not null.
            writer.writeInt32(elementWriter.position);
            writer.writeInt32(value.length);
            writer.writeBytes(elementWriter.getBytesView());
        }
    }
};