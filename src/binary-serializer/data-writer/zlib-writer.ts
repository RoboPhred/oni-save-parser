
import {
    deflateSync
} from "zlib";

import {
    DataWriter
} from "./interfaces"

import {
    ArrayDataWriter
} from "./array-writer";

export class ZlibDataWriter extends ArrayDataWriter {
    getBytes(): ArrayBuffer {
        const bytes = super.getBytesView();
        return deflateSync(bytes as any, {
            windowBits: 15,
        }).buffer;
    }

    getBytesView(): ArrayBufferView {
        // Cannot make a nice efficient view here, since we deflate on-demand.
        return new Uint8Array(this.getBytes());
    }
}