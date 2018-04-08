"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const services_1 = require("../services");
function createSimpleSerializationInfo(id, name, parse, write) {
    const simpleClassCtor = class {
        constructor() {
            this.id = id;
            this.name = name;
        }
        parseDescriptor(reader) {
            return {
                name
            };
        }
        writeDescriptor(writer, descriptor) {
            // No additional data.
        }
        parseType(reader, descriptor) {
            return parse(reader);
        }
        writeType(writer, descriptor, value) {
            write(writer, value);
        }
    };
    microinject_1.injectable(services_1.TypeSerializationInfo)(simpleClassCtor);
    microinject_1.singleton()(simpleClassCtor);
    return simpleClassCtor;
}
exports.createSimpleSerializationInfo = createSimpleSerializationInfo;
//# sourceMappingURL=simple-serializer.js.map