
import {
    inflateSync
} from "zlib";

import {
    DataReader
} from "./interfaces";

import {
    ArrayDataReader
} from "./array-reader";

export class ZlibDataReader extends ArrayDataReader {
    constructor(data: ArrayBufferView) {

        // ONI uses Ionic.Zlib.  More specifically, this:
        //  https://github.com/jstedfast/Ionic.Zlib/blob/master/Ionic.Zlib/ZlibStream.cs

        // nodejs typedefs are wrong: It wants a view,
        //  and DO NOT accept an ArrayBuffer directly.
        const deflated = inflateSync(data as any, {
            windowBits: 15,
        });
        super(deflated.buffer);
    }
}