import { TypeDescriptor, TypeSerializationInfo } from "../interfaces";
export interface ListTypeDescriptor<T = any> extends TypeDescriptor<T[]> {
    name: "array";
    /**
     *  Item type should be a descriptor describing the element
     * of the supplied array type.
     */
    itemType: TypeDescriptor<T>;
}
export declare const serializationInfo: TypeSerializationInfo<any[] | null, ListTypeDescriptor>;
