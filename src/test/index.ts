
import {
    readFileSync,
    writeFileSync
} from "fs";

import {
    parseOniSave,
    writeOniSave
} from "../index";

const fileName = "TheLoneSurvivor";
const fileData = readFileSync(`./test-data/${fileName}.sav`);

console.log("Loading save");
const saveData = parseOniSave(fileData.buffer);

function testWriteback() {
    console.log("Modding minions for writeback");
    
    let logBehaviors = true;
    const minions = saveData.body.gameState.gameObjects.get("Minion") as any[];
    for(let minion of minions) {
        if (logBehaviors) {
            logBehaviors = false;
            writeFileSync(`./test-data/${fileName}-minion-behaviors.json`, JSON.stringify(minion["behaviors"], null, 2));
        }
        minion["scale"]["x"] = 0.3;
        minion["scale"]["y"] = 0.3;
        minion["scale"]["z"] = 0.3;
        const attrBehavior = (minion["behaviors"] as any[]).find(x => x["name"] === "Klei.AI.AttributeLevels");
        const levels = attrBehavior["parsedData"].saveLoadLevels as any[];
        levels.forEach(x => x["level"] = 100);
    }

    console.log("Serializing");
    const writeData = writeOniSave(saveData);
    console.log("Writing to file");
    writeFileSync(`./test-data/${fileName}-writeback.sav`, new Uint8Array(writeData));
    console.log("writeback completed");
}

function testDumpJson() {
    console.log("jsonifying");
    const saveJson = saveData.toJSON() as any;
    const streamData = saveJson["body"]["saveRoot"]["streamed"];
    for (let key of Object.keys(streamData)) {
        streamData[key] = "<stream data>";
    }

    console.log("writing json");
    writeFileSync(`./test-data/${fileName}-dump.json`, JSON.stringify(saveJson, null, 2));
    console.log("json dump completed");
}

testDumpJson();
