import { TypeDescriptor, TypeSerializationInfo } from "../interfaces";
import { Pair } from ".";
export interface PairTypeDescriptor<TKey = any, TValue = any> extends TypeDescriptor<Pair<TKey, TValue>> {
    name: "pair";
    keyType: TypeDescriptor<TKey>;
    valueType: TypeDescriptor<TValue>;
}
export declare const serializationInfo: TypeSerializationInfo<Pair | null, PairTypeDescriptor>;
