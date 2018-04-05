"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zlib_1 = require("zlib");
const array_reader_1 = require("./array-reader");
class ZlibDataReader extends array_reader_1.ArrayDataReader {
    constructor(data) {
        // ONI uses Ionic.Zlib.  More specifically, this:
        //  https://github.com/jstedfast/Ionic.Zlib/blob/master/Ionic.Zlib/ZlibStream.cs
        // nodejs typedefs are wrong: It wants a view,
        //  and DO NOT accept an ArrayBuffer directly.
        const deflated = zlib_1.inflateSync(data, {
            windowBits: 15,
        });
        super(deflated.buffer);
    }
}
exports.ZlibDataReader = ZlibDataReader;
//# sourceMappingURL=zlib-reader.js.map