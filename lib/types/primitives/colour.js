"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("../interfaces");
exports.serializationInfo = {
    id: interfaces_1.TypeInfo.Colour,
    name: "colour",
    parse(reader, descriptor) {
        return {
            r: reader.readByte() / 255,
            g: reader.readByte() / 255,
            b: reader.readByte() / 255,
            a: reader.readByte() / 255,
        };
    },
    write(writer, descriptor, value) {
        writer.writeByte(fracToByte(value.r));
        writer.writeByte(fracToByte(value.g));
        writer.writeByte(fracToByte(value.b));
        writer.writeByte(fracToByte(value.a));
    }
};
function fracToByte(num) {
    const byte = Math.round(num * 255);
    if (byte < 0)
        return 0;
    if (byte > 255)
        return 255;
    return byte;
}
//# sourceMappingURL=colour.js.map