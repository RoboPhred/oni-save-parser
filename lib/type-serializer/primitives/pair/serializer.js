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
let PairTypeSerializer = class PairTypeSerializer {
    constructor(_descriptorSerializer, _typeSerializer) {
        this._descriptorSerializer = _descriptorSerializer;
        this._typeSerializer = _typeSerializer;
        this.id = interfaces_1.TypeID.Pair;
        this.name = "pair";
    }
    parseDescriptor(reader) {
        const subTypeCount = reader.readByte();
        if (subTypeCount !== 2) {
            // Note: We are being stricter here than the ONI code.
            //  Technically they can handle more than 2 sub-types, if that
            //  ends up getting written out.
            throw new Error("Pair types require 2 sub-types.");
        }
        return {
            name: this.name,
            keyType: this._descriptorSerializer.parseDescriptor(reader),
            valueType: this._descriptorSerializer.parseDescriptor(reader)
        };
    }
    writeDescriptor(writer, descriptor) {
        writer.writeByte(2);
        this._descriptorSerializer.writeDescriptor(writer, descriptor.keyType);
        this._descriptorSerializer.writeDescriptor(writer, descriptor.valueType);
    }
    // ONI BUG:
    //  On null pair, ONI writes out [4, -1], as if it was
    //  writing out null to a variable-length collection.
    // However, it checks for a first value >= 0 to indicate not-null,
    //  meaning it will parse a null as not-null and get the parser
    //  into an incorrect state.
    // We reproduce the faulty behavior here to remain accurate to ONI.
    parseType(reader, descriptor) {
        // Writer mirrors ONI code and writes unparsable data.  See ONI bug description above.
        const dataLength = reader.readInt32();
        if (dataLength >= 0) {
            // Trying to parse a data length of 0 makes no sense,
            //  but we are following ONI code.  Do not change this logic.
            //  See ONI bug description above.
            const { keyType, valueType } = descriptor;
            return {
                key: this._typeSerializer.parseType(reader, keyType),
                value: this._typeSerializer.parseType(reader, valueType)
            };
        }
        else {
            return null;
        }
    }
    writeType(writer, descriptor, value) {
        // Writer mirrors ONI code and writes unparsable data.  See ONI bug description above.
        if (value == null) {
            writer.writeInt32(4);
            writer.writeInt32(-1);
        }
        else {
            const { keyType, valueType } = descriptor;
            // Despite ONI not making use of the data length, we still calculate it
            //  and store it against the day that it might be used.
            // TODO: Write directly to writer with ability to
            //  retroactively update data length.
            const dataWriter = new binary_serializer_1.ArrayDataWriter();
            this._typeSerializer.writeType(dataWriter, keyType, value.key);
            this._typeSerializer.writeType(dataWriter, valueType, value.value);
            writer.writeInt32(dataWriter.position);
            writer.writeBytes(dataWriter.getBytesView());
        }
    }
};
PairTypeSerializer = __decorate([
    microinject_1.injectable(services_1.TypeSerializationInfo),
    microinject_1.singleton(),
    __param(0, microinject_1.inject(services_1.TypeDescriptorSerializer)),
    __param(1, microinject_1.inject(services_1.TypeSerializer))
], PairTypeSerializer);
exports.PairTypeSerializer = PairTypeSerializer;
;
//# sourceMappingURL=serializer.js.map