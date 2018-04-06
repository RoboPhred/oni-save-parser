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
const binary_serializer_1 = require("../binary-serializer");
const oni_save_1 = require("../oni-save");
const services_1 = require("./services");
const save_header_1 = require("../save-header");
const save_root_1 = require("../save-root");
const game_settings_1 = require("../game-settings");
const game_state_1 = require("../game-state");
let OniSaveBodyImpl = class OniSaveBodyImpl {
    constructor(_header, saveRoot, gameSettings, gameState) {
        this._header = _header;
        this.saveRoot = saveRoot;
        this.gameSettings = gameSettings;
        this.gameState = gameState;
    }
    parse(reader) {
        if (this._header.isCompressed) {
            const deflatedReader = new binary_serializer_1.ZlibDataReader(reader.viewAllBytes());
            this._parseState(deflatedReader);
        }
        else {
            this._parseState(reader);
        }
    }
    write(writer) {
        if (this._header.isCompressed) {
            const deflateWriter = new binary_serializer_1.ZlibDataWriter();
            this._writeState(deflateWriter);
            writer.writeBytes(deflateWriter.getBytesView());
        }
        else {
            this._writeState(writer);
        }
    }
    toJSON() {
        return {
            saveRoot: this.saveRoot.toJSON(),
            gameSettings: this.gameSettings.toJSON(),
            gameState: this.gameState.toJSON()
        };
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
        this.saveRoot.parse(reader);
        this.gameSettings.parse(reader);
        this.gameState.parse(reader);
    }
    _writeState(writer) {
        writer.writeKleiString("world");
        this.saveRoot.write(writer);
        this.gameSettings.write(writer);
        this.gameState.write(writer);
    }
};
OniSaveBodyImpl = __decorate([
    microinject_1.injectable(services_1.OniSaveBody),
    microinject_1.inScope(oni_save_1.OniSave),
    __param(0, microinject_1.inject(save_header_1.OniSaveHeader)),
    __param(1, microinject_1.inject(save_root_1.OniSaveRoot)),
    __param(2, microinject_1.inject(game_settings_1.OniGameSettings)),
    __param(3, microinject_1.inject(game_state_1.OniGameState))
], OniSaveBodyImpl);
exports.OniSaveBodyImpl = OniSaveBodyImpl;
//# sourceMappingURL=save-body.js.map