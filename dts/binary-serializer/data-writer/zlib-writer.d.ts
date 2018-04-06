import { ArrayDataWriter } from "./array-writer";
export declare class ZlibDataWriter extends ArrayDataWriter {
    getBytes(): ArrayBuffer;
    getBytesView(): ArrayBufferView;
}
