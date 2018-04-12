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
const utils_1 = require("../../../utils");
const logging_1 = require("../../../logging");
const binary_serializer_1 = require("../../../binary-serializer");
const type_serializer_1 = require("../type-serializer");
const services_1 = require("../services");
let GameObjectManagerImpl = class GameObjectManagerImpl {
    constructor(_templateSerializer, logger) {
        this._templateSerializer = _templateSerializer;
        this._gameObjects = {};
        this._gameObjectOrdering = [];
        this._warnExtraniousDataTypes = new Set();
        if (logger) {
            this._logWarn = logger.warn.bind(logger);
            this._logTrace = logger.trace.bind(logger);
        }
        else {
            this._logWarn = () => { };
            this._logTrace = () => { };
        }
    }
    get gameObjects() {
        return this._gameObjects;
    }
    parse(reader) {
        this._logTrace("Parsing prefabs.");
        const prefabCount = reader.readInt32();
        for (let i = 0; i < prefabCount; i++) {
            const prefabName = validatePrefabName(reader.readKleiString());
            this._gameObjectOrdering.push(prefabName);
            this._logTrace(`Parsing prefab "${prefabName}"`);
            const prefabSet = this._parsePrefabSet(reader, prefabName);
            this.gameObjects[prefabName] = prefabSet;
        }
        this._logTrace("Prefab parsing complete.");
    }
    write(writer) {
        writer.writeInt32(this._gameObjectOrdering.length);
        for (let name of this._gameObjectOrdering) {
            writer.writeKleiString(name);
            const prefab = this.gameObjects[name];
            this._writePrefabSet(writer, prefab);
        }
    }
    fromJSON(gameObjects) {
        this._gameObjects = gameObjects;
        // TODO: Amend ordering based on new or removed keys rather than
        //  loosing the order.
        this._gameObjectOrdering = Object.keys(gameObjects);
    }
    toJSON() {
        return Object.assign({}, this._gameObjects);
    }
    _parsePrefabSet(reader, prefabName) {
        const instanceCount = reader.readInt32();
        const dataLength = reader.readInt32();
        const preParsePosition = reader.position;
        this._logTrace(`Prefab has ${instanceCount} objects across ${dataLength} bytes.`);
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
        this._logTrace(`Parsing game object at (${position.x, position.y, position.z}) in folder ${folder}.`);
        const behaviorCount = reader.readInt32();
        this._logTrace(`Parsing ${behaviorCount} game object behaviors.`);
        const behaviors = [];
        for (let i = 0; i < behaviorCount; i++) {
            behaviors[i] = this._parseGameObjectBehavior(reader);
        }
        this._logTrace("Game object parsing complete.");
        return {
            position,
            rotation,
            scale,
            folder,
            behaviors
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
        this._logTrace(`Parsing game object behavior "${name}".`);
        const dataLength = reader.readInt32();
        const preParsePosition = reader.position;
        if (!this._templateSerializer.has(name)) {
            this._logWarn(`GameObjectBehavior "${name} could not be found in the type directory.  Storing remaining data as extraData.`);
            return {
                name,
                templateRecognized: false,
                extraData: reader.readBytes(dataLength)
            };
        }
        const parsedData = this._templateSerializer.parseTemplatedType(reader, name);
        let extraData = undefined;
        const dataRemaining = dataLength - (reader.position - preParsePosition);
        if (dataRemaining < 0) {
            throw new Error(`GameObjectBehavior "${name}" deserialized more type data than expected.`);
        }
        else if (dataRemaining > 0) {
            //  TODO: Implement extra data parsing for specific behaviors that implement ISaveLoadableDetails.
            if (!this._warnExtraniousDataTypes.has(name)) {
                this._warnExtraniousDataTypes.add(name);
                this._logWarn(`GameObjectBehavior "${name}" has extra data.  This object should be inspected for a ISaveLoadableDetails implementation.`);
            }
            extraData = reader.readBytes(dataRemaining);
        }
        return {
            name,
            templateRecognized: true,
            parsedData,
            extraData
        };
    }
    _writeGameObjectBehavior(writer, behavior) {
        const { name, parsedData, extraData } = behavior;
        writer.writeKleiString(name);
        var dataWriter = new binary_serializer_1.ArrayDataWriter();
        if (parsedData != null) {
            this._templateSerializer.writeTemplatedType(dataWriter, name, parsedData);
        }
        if (extraData) {
            dataWriter.writeBytes(extraData);
        }
        writer.writeInt32(dataWriter.position);
        writer.writeBytes(dataWriter.getBytesView());
    }
};
GameObjectManagerImpl = __decorate([
    microinject_1.injectable(services_1.GameObjectManager),
    microinject_1.inScope(services_1.SaveGameScope),
    __param(0, microinject_1.inject(type_serializer_1.TypeTemplateSerializer)),
    __param(1, microinject_1.inject(logging_1.Logger)), __param(1, microinject_1.optional())
], GameObjectManagerImpl);
exports.GameObjectManagerImpl = GameObjectManagerImpl;
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
//# sourceMappingURL=game-object-manager.js.map