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
let ArrayTypeSerializer = class ArrayTypeSerializer {
    constructor(_descriptorSerializer, _typeSerializer) {
        this._descriptorSerializer = _descriptorSerializer;
        this._typeSerializer = _typeSerializer;
        this.id = interfaces_1.TypeID.Array;
        this.name = "array";
    }
    parseDescriptor(reader) {
        // Array does not write its generic count, as it is not
        //  considered a generic to ONI.
        return {
            name: this.name,
            itemType: this._descriptorSerializer.parseDescriptor(reader)
        };
    }
    writeDescriptor(writer, descriptor) {
        this._descriptorSerializer.writeDescriptor(writer, descriptor.itemType);
    }
    parseType(reader, descriptor) {
        const elementType = descriptor.itemType;
        // data-length
        //  Note that if length is -1, this is 4 (the length of the count).
        //  If length is >= 0, this is the length of the element
        //  portion, NOT INCLUDING the count.
        reader.readInt32();
        // element-length
        const length = reader.readInt32();
        if (length === -1) {
            return null;
        }
        else if (length >= 0) {
            if (elementType.name === "byte") {
                const data = reader.readBytes(length);
                return Array.from(new Uint8Array(data));
            }
            else {
                const elements = new Array(length);
                for (let i = 0; i < length; i++) {
                    const element = this._typeSerializer.parseType(reader, elementType);
                    elements[i] = element;
                }
                return elements;
            }
        }
        else {
            throw new Error(`Failed to parse array: Invalid length value of ${length}`);
        }
    }
    writeType(writer, descriptor, value) {
        const elementType = descriptor.itemType;
        if (value == null) {
            // ONI inconsistancy: Element count is only included
            //  in the data-length when the array is null.
            writer.writeInt32(4);
            writer.writeInt32(-1);
        }
        else {
            // Despite ONI not making use of the data length, we still calculate it
            //  and store it against the day that it might be used.
            // TODO: Write directly to writer with ability to
            //  retroactively update data length.
            const elementWriter = new binary_serializer_1.ArrayDataWriter();
            for (let element of value) {
                this._typeSerializer.writeType(elementWriter, elementType, element);
            }
            // ONI inconsistancy: Element count is not included
            //  in the data-length when the array is not null.
            writer.writeInt32(elementWriter.position);
            writer.writeInt32(value.length);
            writer.writeBytes(elementWriter.getBytesView());
        }
    }
};
ArrayTypeSerializer = __decorate([
    microinject_1.injectable(services_1.TypeSerializationInfo),
    microinject_1.singleton(),
    __param(0, microinject_1.inject(services_1.TypeDescriptorSerializer)),
    __param(1, microinject_1.inject(services_1.TypeSerializer))
], ArrayTypeSerializer);
exports.ArrayTypeSerializer = ArrayTypeSerializer;
;
//# sourceMappingURL=serializer.js.map