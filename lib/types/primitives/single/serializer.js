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
let SingleTypeSerializer = class SingleTypeSerializer {
    constructor() {
        this.id = interfaces_1.TypeInfo.Single;
        this.name = "single";
    }
    parse(reader, descriptor) {
        return reader.readSingle();
    }
    write(writer, descriptor, value) {
        writer.writeSingle(value);
    }
};
SingleTypeSerializer = __decorate([
    microinject_1.injectable(services_1.TypeSerializationInfo),
    microinject_1.singleton()
], SingleTypeSerializer);
exports.SingleTypeSerializer = SingleTypeSerializer;
;
//# sourceMappingURL=serializer.js.map