"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zlib_1 = require("zlib");
const array_writer_1 = require("./array-writer");
class ZlibDataWriter extends array_writer_1.ArrayDataWriter {
    getBytes() {
        const bytes = super.getBytesView();
        return zlib_1.deflateSync(bytes, {
            windowBits: 15,
        }).buffer;
    }
    getBytesView() {
        // Cannot make a nice efficient view here, since we deflate on-demand.
        return new Uint8Array(this.getBytes());
    }
}
exports.ZlibDataWriter = ZlibDataWriter;
//# sourceMappingURL=zlib-writer.js.map