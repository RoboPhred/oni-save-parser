
import {
    TypeDescriptor
} from "../../interfaces";

import {
    Pair
} from "./interfaces";

export interface PairTypeDescriptor<TKey = any, TValue = any> extends TypeDescriptor<Pair<TKey, TValue>> {
    name: "pair";
    keyType: TypeDescriptor<TKey>;
    valueType: TypeDescriptor<TValue>;
}