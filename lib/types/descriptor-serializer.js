"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const services_1 = require("./services");
let TypeDescriptorSerializerImpl = class TypeDescriptorSerializerImpl {
    parseDescriptor(reader) {
        throw new Error("Method not implemented.");
    }
    writeDescriptor(writer, descriptor) {
        throw new Error("Method not implemented.");
    }
};
TypeDescriptorSerializerImpl = __decorate([
    microinject_1.injectable(services_1.TypeDescriptorSerializer)
], TypeDescriptorSerializerImpl);
exports.TypeDescriptorSerializerImpl = TypeDescriptorSerializerImpl;
//# sourceMappingURL=descriptor-serializer.js.map