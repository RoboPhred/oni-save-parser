import { TypeDescriptor } from "../../interfaces";

export interface UserDefinedTypeDescriptor<T extends object>
  extends TypeDescriptor<T> {
  name: "user-defined";
  templateName: string;
}
