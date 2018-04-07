import {
    TypeDescriptor
} from "../../interfaces";

export interface HashSetTypeDescriptor<T = any> extends TypeDescriptor<Set<T>>{
    name: "hashset";

    /**
     * Item type should be a descriptor describing the element
     * of the supplied array type.
     */
    itemType: TypeDescriptor<T>;
}
