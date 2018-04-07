"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binary_serializer_1 = require("../../binary-serializer");
const interfaces_1 = require("../interfaces");
const serialization_1 = require("../serialization");
exports.serializationInfo = {
    id: interfaces_1.TypeInfo.Dictionary,
    name: "dictionary",
    parse(reader, descriptor) {
        const { keyType, valueType } = descriptor;
        // data-length.  4 if null.
        reader.readInt32();
        // element-count.  -1 if null.
        const count = reader.readInt32();
        if (count >= 0) {
            let pairs = new Array(count);
            // Values are parsed first
            for (let i = 0; i < count; i++) {
                pairs[i] = new Array(2);
                pairs[i][1] = serialization_1.parse(reader, valueType);
            }
            for (let i = 0; i < count; i++) {
                pairs[i][0] = serialization_1.parse(reader, keyType);
            }
            return new Map(pairs);
        }
        else {
            return null;
        }
    },
    write(writer, descriptor, value) {
        if (value == null) {
            // ONI inconsistancy: Element count is only included
            //  in the data-length when the dictionary is null.
            writer.writeInt32(4);
            writer.writeInt32(-1);
        }
        else {
            const { keyType, valueType } = descriptor;
            // Despite ONI not making use of the data length, we still calculate it
            //  and store it against the day that it might be used.
            // TODO: Write directly to writer with ability to
            //  retroactively update data length.
            // TODO: Mantain element order for load/save cycle consistency.
            const dataWriter = new binary_serializer_1.ArrayDataWriter();
            // Values come first.
            for (let element of value) {
                serialization_1.write(dataWriter, valueType, element[1]);
            }
            for (let element of value) {
                serialization_1.write(dataWriter, keyType, element[0]);
            }
            // ONI inconsistancy: Element count is not included
            //  in the data-length when the array is not null.
            writer.writeInt32(dataWriter.position);
            writer.writeInt32(value.size);
            writer.writeBytes(dataWriter.getBytesView());
        }
    }
};
//# sourceMappingURL=dictionary.js.map