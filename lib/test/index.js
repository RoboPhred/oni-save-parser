"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const index_1 = require("../index");
const fileData = fs_1.readFileSync("./test-data/Rancher-Test.sav");
const saveData = index_1.parseOniSave(fileData.buffer);
let logBehaviors = true;
const minions = saveData.body.gameState.gameObjects.get("Minion");
for (let minion of minions) {
    if (logBehaviors) {
        logBehaviors = false;
        fs_1.writeFileSync("./test-data/minion-behaviors.json", JSON.stringify(minion["behaviors"], null, 2));
    }
    minion["scale"]["x"] = 0.3;
    minion["scale"]["y"] = 0.3;
    minion["scale"]["z"] = 0.3;
    const attrBehavior = minion["behaviors"].find(x => x["name"] === "Klei.AI.AttributeLevels");
    const levels = attrBehavior["parsedData"].saveLoadLevels;
    levels.forEach(x => x["level"] = 100);
}
const writeData = index_1.writeOniSave(saveData);
fs_1.writeFileSync("./test-data/writeback.sav", new Uint8Array(writeData));
// const saveJson = saveData.toJSON() as any;
// const streamData = saveJson["body"]["saveRoot"]["streamed"];
// for (let key of Object.keys(streamData)) {
//     streamData[key] = "<stream data>";
// }
// writeFileSync("./test-data/Rancher-Test.json", JSON.stringify(saveJson, null, 2));
// console.log(JSON.stringify(saveJson, null, 2));
//# sourceMappingURL=index.js.map