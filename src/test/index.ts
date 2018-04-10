
import {
    readFileSync,
    writeFileSync
} from "fs";

import {
    parseSaveGame,
    writeSaveGame
} from "../index";

const fileName = "Rancher-Test-writeback";
const fileData = readFileSync(`./test-data/${fileName}.sav`);

console.log("Loading save");
const saveData = parseSaveGame(fileData.buffer);

function testWriteback() {
    console.log("Modding minions for writeback");

    let modData = saveData.toJSON();
    
    let logBehaviors = true;
    const minions = modData.body.gameObjects["Minion"] as any[];
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


    console.log("Applying mod using fromJSON()");
    saveData.fromJSON(modData);
    

    console.log("Serializing");
    const writeData = writeSaveGame(saveData);
    console.log("Writing to file");
    writeFileSync(`./test-data/${fileName}-writeback.sav`, new Uint8Array(writeData));
    console.log("writeback completed");
}

function testDumpJson() {
    console.log("jsonifying");
    const saveJson = saveData.toJSON();
    const streamData = saveJson.body.saveRoot.streamed;
    for (let key of Object.keys(streamData)) {
        streamData[key] = "<stream data>" as any;
    }

    console.log("writing json");
    writeFileSync(`./test-data/${fileName}-dump.json`, JSON.stringify(saveJson, null, 2));
    console.log("json dump completed");
}

//testDumpJson();
testWriteback();
