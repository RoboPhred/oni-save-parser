import { TypeInfo } from "../../save-structure/type-templates";
import { ParseIterator, UnparseIterator } from "../../parser";
export declare function parseTypeInfo(): ParseIterator<TypeInfo>;
export declare function unparseTypeInfo(info: TypeInfo): UnparseIterator;
