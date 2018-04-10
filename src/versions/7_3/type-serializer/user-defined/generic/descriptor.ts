
import {
    TypeDescriptor
} from "../../interfaces";

export interface UserDefinedGenericTypeDescriptor<T extends object> extends TypeDescriptor<T> {
    name: "user-defined-generic";
    templateName: string;
    genericTypes: TypeDescriptor[] | null;
}