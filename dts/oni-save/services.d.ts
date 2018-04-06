import { Identifier } from "microinject";
import { JsonObjectSerializable } from "../interfaces";
import { BinarySerializable } from "../binary-serializer";
import { OniSaveHeader } from "../save-header";
import { OniSaveBody } from "../save-body";
export interface OniSave extends JsonObjectSerializable, BinarySerializable {
    readonly header: OniSaveHeader;
    readonly body: OniSaveBody;
}
export declare const OniSave: Identifier<OniSave>;
