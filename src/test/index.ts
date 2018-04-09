
import {
    readFileSync,
    writeFileSync
} from "fs";

import {
    parseOniSave,
    writeOniSave
} from "../index";

const fileData = readFileSync("./test-data/TheLOSTCity.sav");

const saveData = parseOniSave(fileData.buffer);

// let logBehaviors = true;
// const minions = saveData.body.gameState.gameObjects.get("Minion") as any[];
// for(let minion of minions) {
//     if (logBehaviors) {
//         logBehaviors = false;
//         writeFileSync("./test-data/minion-behaviors.json", JSON.stringify(minion["behaviors"], null, 2));
//     }
//     minion["scale"]["x"] = 0.3;
//     minion["scale"]["y"] = 0.3;
//     minion["scale"]["z"] = 0.3;
//     const attrBehavior = (minion["behaviors"] as any[]).find(x => x["name"] === "Klei.AI.AttributeLevels");
//     const levels = attrBehavior["parsedData"].saveLoadLevels as any[];
//     levels.forEach(x => x["level"] = 100);
// }

// const writeData = writeOniSave(saveData);
// writeFileSync("./test-data/writeback.sav", new Uint8Array(writeData));


const saveJson = saveData.toJSON() as any;
const streamData = saveJson["body"]["saveRoot"]["streamed"];
for (let key of Object.keys(streamData)) {
    streamData[key] = "<stream data>";
}

writeFileSync("./test-data/Rancher-Test.json", JSON.stringify(saveJson, null, 2));

console.log(JSON.stringify(saveJson, null, 2));