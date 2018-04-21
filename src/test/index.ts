
import {
    readFileSync,
    writeFileSync
} from "fs";

import {
    parseSaveGame,
    writeSaveGame,
    GameObject,
    getBehavior,
    KPrefabIDBehavior,
    GameObjectBehavior
} from "../index";

const fileName = "TheLOSTCity"; //"TheLoneSurvivor";
const fileData = readFileSync(`./test-data/${fileName}.sav`);

console.log("Loading save");
const saveData = parseSaveGame(fileData.buffer);

function testWriteback() {
    console.log("Serializing");
    const writeData = writeSaveGame(saveData);
    console.log("Writing to file");
    writeFileSync(`./test-data/${fileName}-writeback.sav`, new Uint8Array(writeData));
    console.log("writeback completed");
}

function testDumpJson() {
    console.log("jsonifying");
    const saveJson = saveData;
    const streamData = saveJson.body.saveRoot.streamed;
    for (let key of Object.keys(streamData)) {
        streamData[key] = "<stream data>" as any;
    }

    const writeData = saveJson.body.gameObjects;
    console.log("Checking for multiple same behaviors");
    for(let category of Object.keys(writeData)) {
        const items = writeData[category];
        let reportedMultiple = new Set<string>();
        for(let gameObject of items) {
            const seenBehaviors = new Set<string>();
            for(let behavior of gameObject.behaviors) {
                if (reportedMultiple.has(behavior.name)) continue;
                if (seenBehaviors.has(behavior.name)) {
                    reportedMultiple.add(behavior.name);
                    console.log(`Seen behavior "${behavior.name}" more than once in "${category}"`);
                    continue;
                }
                seenBehaviors.add(behavior.name);
            }
        }
    }

    // console.log("writing json");
    // writeFileSync(`./test-data/${fileName}-gameObjects.json`, JSON.stringify(writeData, null, 2));
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

testDumpJson();
//testWriteback();

// testNormalize();