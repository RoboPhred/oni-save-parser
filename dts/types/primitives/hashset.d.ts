import { TypeDescriptor, TypeSerializationInfo } from "../interfaces";
export interface HashSetTypeDescriptor<T = any> extends TypeDescriptor<Set<T>> {
    name: "array";
    /**
     *  Item type should be a descriptor describing the element
     * of the supplied array type.
     */
    itemType: TypeDescriptor<T>;
}
export declare const serializationInfo: TypeSerializationInfo<Set<any> | null, HashSetTypeDescriptor>;
