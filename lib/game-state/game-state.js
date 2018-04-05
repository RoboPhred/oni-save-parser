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
const data_reader_1 = require("../data-reader");
const save_header_1 = require("../save-header");
const save_data_1 = require("../save-data");
const type_templates_1 = require("../type-templates");
const services_1 = require("./services");
let OniGameStateImpl = class OniGameStateImpl {
    constructor(_header, _deserializer) {
        this._header = _header;
        this._deserializer = _deserializer;
    }
    parse(reader) {
        if (this._header.isCompressed) {
            const deflatedReader = new data_reader_1.ZlibDataReader(reader.readAllBytes());
            this._parseState(deflatedReader);
        }
        else {
            this._parseState(reader);
        }
    }
    _parseState(reader) {
        // Here begins our equivalent of the ONI SaveLoader.Load(IReader reader)
        // ONI does nothing aside from read this into the ether.
        //  We will check it to ensure our data still looks good up
        //  to this point.
        const worldString = reader.readKleiString();
        if (worldString !== "world") {
            throw new Error(`Failed to parse gamestate: Expected "world" prefix in state data.`);
        }
        const saveFileRoot = this._deserializer.deserialize(reader);
    }
};
OniGameStateImpl = __decorate([
    microinject_1.injectable(services_1.OniGameState),
    microinject_1.inScope(save_data_1.OniSaveData),
    __param(0, microinject_1.inject(save_header_1.OniSaveHeader)),
    __param(1, microinject_1.inject(type_templates_1.TypeDeserializer))
], OniGameStateImpl);
exports.OniGameStateImpl = OniGameStateImpl;
//# sourceMappingURL=game-state.js.map