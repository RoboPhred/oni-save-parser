import { DataWriter } from "../../binary-serializer";
export declare type UnparseIterator = IterableIterator<any>;
export declare function unparse<T>(writer: DataWriter, unparser: UnparseIterator): T;
