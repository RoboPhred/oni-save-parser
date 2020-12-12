import { DataWriter } from "../../binary-serializer";
export declare type UnparseIterator = Generator<any, any, any>;
export declare type UnparseInterceptor = (value: any) => any;
export declare function unparse<T>(writer: DataWriter, unparser: UnparseIterator, interceptor?: UnparseInterceptor): T;
