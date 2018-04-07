"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binary_serializer_1 = require("../../binary-serializer");
const interfaces_1 = require("../interfaces");
const serialization_1 = require("../serialization");
exports.serializationInfo = {
    id: interfaces_1.TypeInfo.HashSet,
    name: "hashset",
    parse(reader, descriptor) {
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
                return new Set(Array.from(new Uint8Array(data)));
            }
            else {
                const elements = new Array(length);
                for (let i = 0; i < length; i++) {
                    const element = serialization_1.parse(reader, elementType);
                    elements[i] = element;
                }
                return new Set(elements);
            }
        }
        else {
            throw new Error(`Failed to parse array: Invalid length value of ${length}`);
        }
    },
    write(writer, descriptor, value) {
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
            // TODO: Mantain element order for load/save cycle consistency.
            const elementWriter = new binary_serializer_1.ArrayDataWriter();
            for (let element of value) {
                serialization_1.write(elementWriter, elementType, element);
            }
            // ONI inconsistancy: Element count is not included
            //  in the data-length when the array is not null.
            writer.writeInt32(elementWriter.position);
            writer.writeInt32(value.size);
            writer.writeBytes(elementWriter.getBytesView());
        }
    }
};
//# sourceMappingURL=hashset.js.map