"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const index_1 = require("../index");
const binary_serializer_1 = require("../binary-serializer");
const fileData = fs_1.readFileSync("./test-data/Rancher-Test.sav");
const saveData = index_1.parseOniSave(fileData.buffer);
const writeTest = new binary_serializer_1.ArrayDataWriter();
saveData.write(writeTest);
fs_1.writeFileSync("./test-data/writeback.sav", writeTest.getBytesView());
const saveJson = saveData.toJSON();
const streamData = saveJson["body"]["saveRoot"]["streamed"];
for (let key of Object.keys(streamData)) {
    streamData[key] = "<stream data>";
}
fs_1.writeFileSync("./test-data/Rancher-Test.json", JSON.stringify(saveJson, null, 2));
console.log(JSON.stringify(saveJson, null, 2));
//# sourceMappingURL=index.js.map