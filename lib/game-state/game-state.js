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
const binary_serializer_1 = require("../binary-serializer");
const oni_save_1 = require("../oni-save");
const type_serializer_1 = require("../type-serializer");
const services_1 = require("./services");
let OniGameStateManagerImpl = OniGameStateManagerImpl_1 = class OniGameStateManagerImpl {
    constructor(_templateSerializer, _logger) {
        this._templateSerializer = _templateSerializer;
        this._logger = _logger;
        this.gameObjects = new Map();
        this._gameObjectOrdering = [];
        this._versionMinor = null;
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
        this._versionMinor = versionMinor;
        this._parsePrefabs(reader);
    }
    write(writer) {
        if (this._versionMinor == null) {
            throw new Error("Game state has not been parsed.");
        }
        writer.writeChars(OniGameStateManagerImpl_1.SAVE_HEADER);
        writer.writeInt32(OniGameStateManagerImpl_1.CURRENT_VERSION_MAJOR);
        writer.writeInt32(this._versionMinor);
        this._writePrefabs(writer);
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
            this._gameObjectOrdering.push(prefabName);
            this._logger.trace(`Parsing prefab "${prefabName}"`);
            const prefabSet = this._parsePrefabSet(reader, prefabName);
            this.gameObjects.set(prefabName, prefabSet);
        }
        this._logger.trace("Prefab parsing complete.");
    }
    _writePrefabs(writer) {
        writer.writeInt32(this._gameObjectOrdering.length);
        for (let name of this._gameObjectOrdering) {
            writer.writeKleiString(name);
            const prefab = this.gameObjects.get(name);
            this._writePrefabSet(writer, prefab);
        }
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
            // We could skip the bytes, but if we want to write data back, we better know what those bytes were.
            //  Each GameObject itself tracks data length, so we should be covered.  Anything that is missing
            //  is a sign of a parse issue.
            throw new Error(`Prefab "${prefabName}" parse consumed ${bytesRemaining} less bytes than its declared length of ${dataLength}.`);
        }
        return prefabObjects;
    }
    _writePrefabSet(writer, prefabObjects) {
        // We need to know the data length.
        //  Write the data to another buffer, so we can
        //  figure out its length and write its data out.
        const setWriter = new binary_serializer_1.ArrayDataWriter();
        for (let gameObject of prefabObjects) {
            this._writeGameObject(setWriter, gameObject);
        }
        const gameObjectData = setWriter.getBytesView();
        writer.writeInt32(prefabObjects.length);
        writer.writeInt32(gameObjectData.byteLength);
        writer.writeBytes(gameObjectData);
    }
    _parseGameObject(reader) {
        const position = reader.readVector3();
        const rotation = reader.readQuaternion();
        const scale = reader.readVector3();
        const folder = reader.readByte();
        this._logger.trace(`Parsing game object at (${position.x, position.y, position.z}) in folder ${folder}.`);
        const behaviorCount = reader.readInt32();
        this._logger.trace(`Parsing ${behaviorCount} game object behaviors.`);
        const behaviors = [];
        for (let i = 0; i < behaviorCount; i++) {
            behaviors[i] = this._parseGameObjectBehavior(reader);
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
    _writeGameObject(writer, gameObject) {
        const { position, rotation, scale, folder, behaviors } = gameObject;
        writer.writeVector3(position);
        writer.writeQuaternion(rotation);
        writer.writeVector3(scale);
        writer.writeByte(folder);
        writer.writeInt32(behaviors.length);
        for (let behavior of behaviors) {
            this._writeGameObjectBehavior(writer, behavior);
        }
    }
    _parseGameObjectBehavior(reader) {
        const name = validateBehaviorName(reader.readKleiString());
        this._logger.trace(`Parsing game object behavior "${name}".`);
        const dataLength = reader.readInt32();
        const preParsePosition = reader.position;
        if (!this._templateSerializer.has(name)) {
            this._logger.warn(`GameObjectBehavior "${name} could not be found in the type directory.  Storing remaining data as extraData.`);
            return {
                name,
                hasParseData: false,
                parsedData: null,
                extraData: reader.readBytes(dataLength)
            };
        }
        const parsedData = this._templateSerializer.parseTemplatedType(reader, name);
        let extraData = null;
        const dataRemaining = dataLength - (reader.position - preParsePosition);
        if (dataRemaining < 0) {
            throw new Error(`GameObjectBehavior "${name}" deserialized more type data than expected.`);
        }
        else if (dataRemaining > 0) {
            // We know these exists, but for now we don't know what to do with them.
            //  TODO: Implement extra data parsing for specific behaviors that implement ISaveLoadableDetails.
            this._logger.warn(`GameObjectBehavior "${name}" has extra data.  This object should be inspected for a ISaveLoadableDetails implementation.`);
            extraData = reader.readBytes(dataRemaining);
        }
        return {
            name,
            hasParseData: true,
            parsedData,
            extraData
        };
    }
    _writeGameObjectBehavior(writer, behavior) {
        const { name, hasParseData, parsedData, extraData } = behavior;
        writer.writeKleiString(name);
        var dataWriter = new binary_serializer_1.ArrayDataWriter();
        if (hasParseData) {
            this._templateSerializer.writeTemplatedType(dataWriter, name, parsedData);
        }
        if (extraData) {
            dataWriter.writeBytes(extraData);
        }
        writer.writeInt32(dataWriter.position);
        writer.writeBytes(dataWriter.getBytesView());
    }
};
OniGameStateManagerImpl.SAVE_HEADER = "KSAV";
OniGameStateManagerImpl.CURRENT_VERSION_MAJOR = 7;
OniGameStateManagerImpl.CURRENT_VERSION_MINOR = 3;
OniGameStateManagerImpl = OniGameStateManagerImpl_1 = __decorate([
    microinject_1.injectable(services_1.OniGameState),
    microinject_1.inScope(oni_save_1.OniSave),
    __param(0, microinject_1.inject(type_serializer_1.TypeTemplateSerializer)),
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
    return {
        position: this.position,
        rotation: this.rotation,
        scale: this.scale,
        folder: this.folder,
        behaviors: this.behaviors
    };
}
var OniGameStateManagerImpl_1;
//# sourceMappingURL=game-state.js.map