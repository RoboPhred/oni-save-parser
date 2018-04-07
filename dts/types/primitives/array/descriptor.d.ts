import { TypeDescriptor } from "../../interfaces";
export interface ArrayTypeDescriptor<T = any> extends TypeDescriptor<T[]> {
    name: "array";
    /**
     * Item type should be a descriptor describing the element
     * of the supplied array type.
     */
    itemType: TypeDescriptor<T>;
}
