"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binary_serializer_1 = require("../../binary-serializer");
const interfaces_1 = require("../interfaces");
const serialization_1 = require("../serialization");
exports.serializationInfo = {
    id: interfaces_1.TypeInfo.Array,
    name: "array",
    // ONI BUG:
    //  On null pair, ONI writes out [4, -1], as if it was
    //  writing out null to a variable-length collection.
    // However, it checks for a first value >= 0 to indicate not-null,
    //  meaning it will parse a null as not-null and get the parser
    //  into an incorrect state.
    // We reproduce the faulty behavior here to remain accurate to ONI.
    parse(reader, descriptor) {
        // Writer mirrors ONI code and writes unparsable data.  See ONI bug description above.
        const dataLength = reader.readInt32();
        if (dataLength >= 0) {
            // Trying to parse a data length of 0 makes no sense,
            //  but we are following ONI code.  Do not change this logic.
            //  See ONI bug description above.
            const { keyType, valueType } = descriptor;
            return {
                key: serialization_1.parse(reader, keyType),
                value: serialization_1.parse(reader, valueType)
            };
        }
        else {
            return null;
        }
    },
    write(writer, descriptor, value) {
        // Writer mirrors ONI code and writes unparsable data.  See ONI bug description above.
        if (value == null) {
            writer.writeInt32(4);
            writer.writeInt32(-1);
        }
        else {
            const { keyType, valueType } = descriptor;
            // Despite ONI not making use of the data length, we still calculate it
            //  and store it against the day that it might be used.
            // TODO: Write directly to writer with ability to
            //  retroactively update data length.
            const dataWriter = new binary_serializer_1.ArrayDataWriter();
            serialization_1.write(dataWriter, keyType, value.key);
            serialization_1.write(dataWriter, valueType, value.value);
            writer.writeInt32(dataWriter.position);
            writer.writeBytes(dataWriter.getBytesView());
        }
    }
};
//# sourceMappingURL=pair.js.map