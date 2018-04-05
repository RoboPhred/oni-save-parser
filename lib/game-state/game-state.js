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
const utils_1 = require("../utils");
const logging_1 = require("../logging");
const oni_save_1 = require("../oni-save");
const type_templates_1 = require("../type-templates");
const services_1 = require("./services");
let OniGameStateManagerImpl = OniGameStateManagerImpl_1 = class OniGameStateManagerImpl {
    constructor(_deserializer, _logger) {
        this._deserializer = _deserializer;
        this._logger = _logger;
        this.gameObjects = new Map();
    }
    parse(reader) {
        const expectedHeader = OniGameStateManagerImpl_1.SAVE_HEADER;
        const header = reader.readChars(expectedHeader.length);
        if (header !== expectedHeader) {
            throw new Error(`Game state header mismatch.  Expected "${expectedHeader}" but got "${header}" (${Array.from(header).map(x => x.charCodeAt(0))})`);
        }
        const expectedMajor = OniGameStateManagerImpl_1.CURRENT_VERSION_MAJOR;
        const expectedMinor = OniGameStateManagerImpl_1.CURRENT_VERSION_MINOR;
        const versionMajor = reader.readInt32();
        const versionMinor = reader.readInt32();
        if (versionMajor !== expectedMajor) {
            throw new Error(`Game state version mismatch.  Expected major version ${expectedMajor} but got ${versionMajor}.`);
        }
        if (versionMinor > expectedMinor) {
            // If they stick to semver, then minor changes should in theory be backwards compatible with older versions.
            //  This means its likely we can parse this correctly, but not guarenteed.
            // It's worth noting that the ONI itself will refuse to load a minor version higher than it understands.
            this._logger.warn(`Game state version ${versionMajor}.${versionMinor} has a higher minor version than expected ${expectedMajor}.${expectedMinor}.  Problems may occur with parsing.`);
        }
        this._parsePrefabs(reader);
    }
    toJSON() {
        const gameObjects = {};
        for (let pair of this.gameObjects) {
            gameObjects[pair[0]] = pair[1].map(x => x.toJSON());
        }
        return {
            gameObjects
        };
    }
    _parsePrefabs(reader) {
        this._logger.trace("Parsing prefabs.");
        const prefabCount = reader.readInt32();
        for (let i = 0; i < prefabCount; i++) {
            const prefabName = validatePrefabName(reader.readKleiString());
            this._logger.trace(`Parsing prefab "${prefabName}"`);
            const prefabSet = this._parsePrefabSet(reader, prefabName);
            this.gameObjects.set(prefabName, prefabSet);
        }
        this._logger.trace("Prefab parsing complete.");
    }
    _parsePrefabSet(reader, prefabName) {
        const instanceCount = reader.readInt32();
        const dataLength = reader.readInt32();
        const preParsePosition = reader.position;
        this._logger.trace(`Prefab has ${instanceCount} objects across ${dataLength} bytes.`);
        const prefabObjects = new Array(instanceCount);
        for (let i = 0; i < instanceCount; i++) {
            prefabObjects[i] = this._parseGameObject(reader);
        }
        const bytesRemaining = dataLength - (reader.position - preParsePosition);
        if (bytesRemaining < 0) {
            throw new Error(`Prefab "${prefabName}" parse consumed ${-bytesRemaining} more bytes than its declared length of ${dataLength}.`);
        }
        else if (bytesRemaining > 0) {
            this._logger.warn(`Prefab "${prefabName}" parse consumed ${bytesRemaining} less bytes than expected.  Remaining data will be skipped.`);
            reader.skipBytes(bytesRemaining);
        }
        return prefabObjects;
    }
    _parseGameObject(reader) {
        const position = reader.readVector3();
        const rotation = reader.readQuaternion();
        const scale = reader.readVector3();
        const folder = reader.readByte();
        this._logger.trace(`Parsing game object at (${position.x, position.y, position.z}) in folder ${folder}.`);
        const behaviorCount = reader.readInt32();
        this._logger.trace(`Parsing ${behaviorCount} game object behaviors.`);
        const behaviors = new Map();
        for (let i = 0; i < behaviorCount; i++) {
            const behaviorName = validateBehaviorName(reader.readKleiString());
            this._logger.trace(`Parsing game object behavior "${behaviorName}".`);
            const behavior = this._parseGameObjectBehavior(reader, behaviorName);
            behaviors.set(behaviorName, behavior);
        }
        this._logger.trace("Game object parsing complete.");
        return {
            position,
            rotation,
            scale,
            folder,
            behaviors,
            toJSON: gameObjectToJson
        };
    }
    _parseGameObjectBehavior(reader, behaviorName) {
        const dataLength = reader.readInt32();
        const preParsePosition = reader.position;
        if (!this._deserializer.hasType(behaviorName)) {
            this._logger.warn(`GameObjectBehavior "${behaviorName} could not be found in the type directory.  Storing remaining data as extraData.`);
            return {
                parsedData: null,
                extraData: reader.readBytes(dataLength)
            };
        }
        const parsedData = this._deserializer.deserializeType(reader, behaviorName);
        let extraData = null;
        const dataRemaining = dataLength - (reader.position - preParsePosition);
        if (dataRemaining < 0) {
            throw new Error(`GameObjectBehavior "${behaviorName}" deserialized more type data than expected.`);
        }
        else if (dataRemaining > 0) {
            // We know these exists, but for now we don't know what to do with them.
            //  TODO: Implement extra data parsing for specific behaviors that implement ISaveLoadableDetails.
            this._logger.warn(`GameObjectBehavior "${behaviorName}" has extra data.  This object should be inspected for a ISaveLoadableDetails implementation.`);
            extraData = reader.readBytes(dataRemaining);
        }
        return {
            parsedData,
            extraData
        };
    }
};
OniGameStateManagerImpl.SAVE_HEADER = "KSAV";
OniGameStateManagerImpl.CURRENT_VERSION_MAJOR = 7;
OniGameStateManagerImpl.CURRENT_VERSION_MINOR = 3;
OniGameStateManagerImpl = OniGameStateManagerImpl_1 = __decorate([
    microinject_1.injectable(services_1.OniGameState),
    microinject_1.inScope(oni_save_1.OniSave),
    __param(0, microinject_1.inject(type_templates_1.TypeDeserializer)),
    __param(1, microinject_1.inject(logging_1.Logger))
], OniGameStateManagerImpl);
exports.OniGameStateManagerImpl = OniGameStateManagerImpl;
/**
 * Check if we parsed a meaningful prefab name.
 * @param name The name to validate.
 */
function validatePrefabName(name) {
    return utils_1.validateDotNetIdentifierName(name);
}
/**
 * Check if we parsed a meaningful prefab name.
 * @param name The name to validate.
 */
function validateBehaviorName(name) {
    return utils_1.validateDotNetIdentifierName(name);
}
function gameObjectToJson() {
    const behaviors = {};
    for (let pair of this.behaviors) {
        behaviors[pair[0]] = pair[1];
    }
    return {
        position: this.position,
        rotation: this.rotation,
        scale: this.scale,
        folder: this.folder,
        behaviors
    };
}
var OniGameStateManagerImpl_1;
//# sourceMappingURL=game-state.js.map