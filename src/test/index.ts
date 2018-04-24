
import {
    readFileSync,
    writeFileSync
} from "fs";

import {
    parseSaveGame,
    writeSaveGame
} from "../index";

const fileName = "Rancher-Test"; //"TheLoneSurvivor";
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
    writeFileSync(`./test-data/${fileName}-gameObjects.json`, JSON.stringify(writeData, null, 2));
    console.log("json dump completed");
}

testDumpJson();
//testWriteback();
