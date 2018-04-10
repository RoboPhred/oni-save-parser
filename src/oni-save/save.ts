
import {
    asScope,
    inject,
    injectable
} from "microinject";

import {
    JsonObjectSerializable
} from "../interfaces";

import {
    DataReader,
    DataWriter
} from "../binary-serializer";

import {
    TypeTemplateRegistry
} from "../type-serializer";

import {
    OniSaveHeader
} from "../save-header";

import {
    OniSaveBody
} from "../save-body";

import {
    OniSave
} from "./services";


@injectable(OniSave)
@asScope(OniSave)
export class OniSaveImpl implements OniSave {

    constructor(
        @inject(OniSaveHeader) public header: OniSaveHeader,
        @inject(TypeTemplateRegistry) private _templates: TypeTemplateRegistry,
        @inject(OniSaveBody) public body: OniSaveBody
    ) {}

    parse(reader: DataReader) {
        this.header.parse(reader);
        this._templates.parse(reader);
        this.body.parse(reader);
    }

    write(writer: DataWriter) {
        this.header.write(writer);
        this._templates.write(writer);
        this.body.write(writer);
    }

    toJSON() {
        return {
            header: this.header.toJSON(),
            body: this.body.toJSON()
        };
    }
}