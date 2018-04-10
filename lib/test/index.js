"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const index_1 = require("../index");
const fileName = "Rancher-Test";
const fileData = fs_1.readFileSync(`./test-data/${fileName}.sav`);
console.log("Loading save");
const saveData = index_1.parseSaveGame(fileData.buffer);
function testWriteback() {
    console.log("Modding minions for writeback");
    let logBehaviors = true;
    const minions = saveData.body.gameObjects.get("Minion");
    for (let minion of minions) {
        if (logBehaviors) {
            logBehaviors = false;
            fs_1.writeFileSync(`./test-data/${fileName}-minion-behaviors.json`, JSON.stringify(minion["behaviors"], null, 2));
        }
        minion["scale"]["x"] = 0.3;
        minion["scale"]["y"] = 0.3;
        minion["scale"]["z"] = 0.3;
        const attrBehavior = minion["behaviors"].find(x => x["name"] === "Klei.AI.AttributeLevels");
        const levels = attrBehavior["parsedData"].saveLoadLevels;
        levels.forEach(x => x["level"] = 100);
    }
    console.log("Serializing");
    const writeData = index_1.writeSaveGame(saveData);
    console.log("Writing to file");
    fs_1.writeFileSync(`./test-data/${fileName}-writeback.sav`, new Uint8Array(writeData));
    console.log("writeback completed");
}
// function testDumpJson() {
//     console.log("jsonifying");
//     const saveJson = saveData.toJSON() as any;
//     const streamData = saveJson["body"]["saveRoot"]["streamed"];
//     for (let key of Object.keys(streamData)) {
//         streamData[key] = "<stream data>";
//     }
//     console.log("writing json");
//     writeFileSync(`./test-data/${fileName}-dump.json`, JSON.stringify(saveJson, null, 2));
//     console.log("json dump completed");
// }
//testDumpJson();
testWriteback();
//# sourceMappingURL=index.js.map