"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const microinject_1 = require("microinject");
const index_1 = require("../index");
const parse_steps_1 = require("../parse-steps");
let ConsoleStepListener = class ConsoleStepListener {
    constructor() {
        this._sameLine = false;
        this._stack = [];
    }
    onStart(e) {
        if (e.max != null) {
            this._stack.push(`${e.name} (${e.current} of ${e.max})`);
        }
        else {
            this._stack.push(`${e.name}`);
        }
        if (this._sameLine) {
            process.stdout.write("\n");
        }
        process.stdout.write(this._stack.join(" > "));
        this._sameLine = true;
    }
    onProgress(e) {
        this._stack.pop();
        this._stack.push(`${e.name} (${e.current} of ${e.max})`);
        process.stdout.write("\r" + this._stack.join(" > "));
        this._sameLine = true;
    }
    onEnd(e) {
        if (this._sameLine) {
            this._sameLine = false;
            this._stack.pop();
            process.stdout.write(" done\n");
        }
        else {
            process.stdout.write(this._stack.join(" > ") + " done\n");
            this._stack.pop();
        }
    }
};
ConsoleStepListener = __decorate([
    microinject_1.injectable(parse_steps_1.ParseStepListener)
], ConsoleStepListener);
const injectModule = new microinject_1.ContainerModule(bind => {
    // bind(ConsoleStepListener)
});
const fileName = process.argv.length > 2 ? process.argv[2] : "TestShennanigans";
const fileData = fs_1.readFileSync(`./test-data/${fileName}.sav`);
console.log("Loading save");
const saveData = index_1.parseSaveGame(fileData.buffer, injectModule);
function testWriteback() {
    console.log("\n\n\nSerializing");
    const writeData = index_1.writeSaveGame(saveData, injectModule);
    console.log("Writing to file");
    fs_1.writeFileSync(`./test-data/${fileName}-writeback.sav`, new Uint8Array(writeData));
    console.log("writeback completed");
}
function testDumpJson() {
    console.log("jsonifying");
    const saveJson = saveData;
    const streamData = saveJson.body.saveRoot.streamed;
    for (let key of Object.keys(streamData)) {
        streamData[key] = "<stream data>";
    }
    const writeData = saveJson.body.gameObjects;
    console.log("Checking for multiple same behaviors");
    for (let category of Object.keys(writeData)) {
        const items = writeData[category];
        let reportedMultiple = new Set();
        for (let gameObject of items) {
            const seenBehaviors = new Set();
            for (let behavior of gameObject.behaviors) {
                if (reportedMultiple.has(behavior.name))
                    continue;
                if (seenBehaviors.has(behavior.name)) {
                    reportedMultiple.add(behavior.name);
                    console.log(`Seen behavior "${behavior.name}" more than once in "${category}"`);
                    continue;
                }
                seenBehaviors.add(behavior.name);
            }
        }
    }
    console.log("writing json");
    fs_1.writeFileSync(`./test-data/${fileName}-gameObjects.json`, JSON.stringify(writeData, null, 2));
    console.log("json dump completed");
}
// import { schema, normalize } from "normalizr";
// function testNormalize() {
//     const behaviorIDMap = new Map<string, number>();
//     const streamData = saveData.body.saveRoot.streamed;
//     for (let key of Object.keys(streamData)) {
//         streamData[key] = "<stream data>" as any;
//     }
//     const gameObjectBehaviorSchema = new schema.Entity(
//         "gameObjectBehavior",
//         {},
//         {
//             idAttribute: (input: any, parent: any, key) => {
//                 // Need to track the discovery offset, as
//                 //  the array can contain multiple of the same behavior,
//                 //  which must be kept as appropriate. 
//                 const rootID = `${parent.type}-${parent.id}-${input.name}`;
//                 const currentIndex = behaviorIDMap.get(rootID) || 0;
//                 const id = rootID + '-' + currentIndex;
//                 behaviorIDMap.set(rootID, currentIndex + 1);
//                 return id;
//             }
//         }
//     )
//     const gameObjectBehaviorsSchema = new schema.Array(gameObjectBehaviorSchema);
//     const gameObjectSchema = new schema.Entity(
//         "gameObject",
//         {
//             behaviors: gameObjectBehaviorsSchema
//         },
//         {
//             idAttribute: (input: GameObject, parent, key) => {
//                 const idPrefab = getBehavior(input, KPrefabIDBehavior);
//                 if (!idPrefab) return "INVALID";
//                 return String(idPrefab.parsedData.InstanceID);
//             },
//             processStrategy: (input: GameObject, parent, key) => {
//                 const idPrefab = getBehavior(input, KPrefabIDBehavior);
//                 let id: string;
//                 if (!idPrefab) id = "INVALID";
//                 else id = String(idPrefab.parsedData.InstanceID);
//                 return {
//                     ...input,
//                     id,
//                     type: key
//                 };
//             }
//         }
//     );
//     const gameObjectsSchema = new schema.Array(gameObjectSchema);
//     const gameObjectTypesSchema = new schema.Values(
//         gameObjectsSchema
//     );
//     const saveDataSchema = new schema.Object(
//         {
//             body: {
//                 gameObjects: gameObjectTypesSchema
//             }
//         }
//     );
//     const data = normalize(saveData, saveDataSchema);
//     writeFileSync(`${fileName}-normalized.json`, JSON.stringify(data, null, 2));
// }
//testDumpJson();
testWriteback();
// testNormalize();
//# sourceMappingURL=index.js.map