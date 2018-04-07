"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const binary_serializer_1 = require("../../../binary-serializer");
const interfaces_1 = require("../../interfaces");
const services_1 = require("../../services");
let DictionaryTypeSerializer = class DictionaryTypeSerializer {
    constructor(_typeSerializer) {
        this._typeSerializer = _typeSerializer;
        this.id = interfaces_1.TypeInfo.Dictionary;
        this.name = "dictionary";
    }
    parse(reader, descriptor) {
        const { keyType, valueType } = descriptor;
        // data-length.  4 if null.
        reader.readInt32();
        // element-count.  -1 if null.
        const count = reader.readInt32();
        if (count >= 0) {
            let pairs = new Array(count);
            // Values are parsed first
            for (let i = 0; i < count; i++) {
                pairs[i] = new Array(2);
                pairs[i][1] = this._typeSerializer.parse(reader, valueType);
            }
            for (let i = 0; i < count; i++) {
                pairs[i][0] = this._typeSerializer.parse(reader, keyType);
            }
            return new Map(pairs);
        }
        else {
            return null;
        }
    }
    write(writer, descriptor, value) {
        if (value == null) {
            // ONI inconsistancy: Element count is only included
            //  in the data-length when the dictionary is null.
            writer.writeInt32(4);
            writer.writeInt32(-1);
        }
        else {
            const { keyType, valueType } = descriptor;
            // Despite ONI not making use of the data length, we still calculate it
            //  and store it against the day that it might be used.
            // TODO: Write directly to writer with ability to
            //  retroactively update data length.
            // TODO: Mantain element order for load/save cycle consistency.
            const dataWriter = new binary_serializer_1.ArrayDataWriter();
            // Values come first.
            for (let element of value) {
                this._typeSerializer.write(dataWriter, valueType, element[1]);
            }
            for (let element of value) {
                this._typeSerializer.write(dataWriter, keyType, element[0]);
            }
            // ONI inconsistancy: Element count is not included
            //  in the data-length when the array is not null.
            writer.writeInt32(dataWriter.position);
            writer.writeInt32(value.size);
            writer.writeBytes(dataWriter.getBytesView());
        }
    }
};
DictionaryTypeSerializer = __decorate([
    microinject_1.injectable(services_1.TypeSerializationInfo),
    microinject_1.singleton(),
    __param(0, microinject_1.inject(services_1.TypeSerializer))
], DictionaryTypeSerializer);
exports.DictionaryTypeSerializer = DictionaryTypeSerializer;
//# sourceMappingURL=serializer.js.map