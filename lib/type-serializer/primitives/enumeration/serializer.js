"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const interfaces_1 = require("../../interfaces");
const services_1 = require("../../services");
let EnumerationTypeSerializer = class EnumerationTypeSerializer {
    constructor() {
        this.id = interfaces_1.TypeID.Enumeration;
        this.name = "enumeration";
    }
    parseDescriptor(reader) {
        const enumerationName = reader.readKleiString();
        if (enumerationName == null) {
            throw new Error("Enumeration name must not be null.");
        }
        return {
            name: this.name,
            enumerationName
        };
    }
    writeDescriptor(writer, descriptor) {
        writer.writeKleiString(descriptor.enumerationName);
    }
    parseType(reader, descriptor) {
        return reader.readInt32();
    }
    writeType(writer, descriptor, value) {
        writer.writeInt32(value);
    }
};
EnumerationTypeSerializer = __decorate([
    microinject_1.injectable(services_1.TypeSerializationInfo),
    microinject_1.singleton()
], EnumerationTypeSerializer);
exports.EnumerationTypeSerializer = EnumerationTypeSerializer;
;
//# sourceMappingURL=serializer.js.map