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
let ColourTypeSerializer = class ColourTypeSerializer {
    constructor() {
        this.id = interfaces_1.TypeInfo.Colour;
        this.name = "colour";
    }
    parse(reader, descriptor) {
        return {
            r: reader.readByte() / 255,
            g: reader.readByte() / 255,
            b: reader.readByte() / 255,
            a: reader.readByte() / 255,
        };
    }
    write(writer, descriptor, value) {
        writer.writeByte(fracToByte(value.r));
        writer.writeByte(fracToByte(value.g));
        writer.writeByte(fracToByte(value.b));
        writer.writeByte(fracToByte(value.a));
    }
};
ColourTypeSerializer = __decorate([
    microinject_1.injectable(services_1.TypeSerializationInfo),
    microinject_1.singleton()
], ColourTypeSerializer);
exports.ColourTypeSerializer = ColourTypeSerializer;
;
function fracToByte(num) {
    const byte = Math.round(num * 255);
    if (byte < 0)
        return 0;
    if (byte > 255)
        return 255;
    return byte;
}
//# sourceMappingURL=serializer.js.map