
import {
    asScope,
    inject,
    injectable
} from "microinject";

import {
    JsonObjectSerializable
} from "../interfaces";

import {
    DataReader
} from "../data-reader";

import {
    TypeTemplateRegistry
} from "../type-templates";

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
export class OniSaveImpl implements OniSave, JsonObjectSerializable {

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

    toJSON() {
        return {
            header: this.header.toJSON(),
            body: this.body.toJSON()
        };
    }
}