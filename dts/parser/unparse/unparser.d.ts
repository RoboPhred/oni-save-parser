import { DataWriter } from "../../binary-serializer";
export declare type UnparseIterator = IterableIterator<any>;
export declare type UnparseInterceptor = (value: any) => any;
export declare function unparse<T>(writer: DataWriter, unparser: UnparseIterator, interceptor?: UnparseInterceptor): T;
