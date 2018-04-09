
import {
    inflate
} from "pako";

import {
    DataReader
} from "./interfaces";

import {
    ArrayDataReader
} from "./array-reader";

export class ZlibDataReader extends ArrayDataReader {
    constructor(data: Uint8Array) {

        // ONI uses Ionic.Zlib.  More specifically, this:
        //  https://github.com/jstedfast/Ionic.Zlib/blob/master/Ionic.Zlib/ZlibStream.cs

        const deflated = inflate(data, {
            windowBits: 15,
        });
        super(deflated.buffer);
    }
}