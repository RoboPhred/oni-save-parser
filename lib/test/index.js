"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const index_1 = require("../index");
const fileData = fs_1.readFileSync("./test-data/TheLOSTCity.sav");
const saveData = index_1.parseOniSave(fileData.buffer);
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
const saveJson = saveData.toJSON();
const streamData = saveJson["body"]["saveRoot"]["streamed"];
for (let key of Object.keys(streamData)) {
    streamData[key] = "<stream data>";
}
fs_1.writeFileSync("./test-data/Rancher-Test.json", JSON.stringify(saveJson, null, 2));
console.log(JSON.stringify(saveJson, null, 2));
//# sourceMappingURL=index.js.map