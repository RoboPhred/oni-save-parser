import { TypeDescriptor } from "../../interfaces";
export interface ListTypeDescriptor<T = any> extends TypeDescriptor<T[]> {
    name: "list";
    /**
     * Item type should be a descriptor describing the element
     * of the supplied array type.
     */
    itemType: TypeDescriptor<T>;
}
