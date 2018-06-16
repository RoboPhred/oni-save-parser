"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const deep_diff_1 = require("deep-diff");
const index_1 = require("../index");
const fileName = process.argv.length > 2 ? process.argv[2] : "TestShennanigans";
console.log("Loading save");
const saveData = loadFile(fileName);
console.log("re-saving");
const writebackName = `${fileName}-writeback`;
saveFile(writebackName, saveData);
console.log("reloading");
const writebackData = loadFile(writebackName);
console.log("diffing");
delete saveData.world.streamed;
delete writebackData.world.streamed;
const writebackDiff = deep_diff_1.diff(saveData, writebackData);
console.log("changes:", writebackDiff && writebackDiff.length);
if (writebackDiff) {
    console.dir(writebackDiff);
}
function loadFile(fileName) {
    const fileData = fs_1.readFileSync(`./test-data/${fileName}.sav`);
    return index_1.parseSaveGame(fileData.buffer);
}
function saveFile(fileName, save) {
    const fileData = index_1.writeSaveGame(save);
    fs_1.writeFileSync(`./test-data/${fileName}.sav`, new Uint8Array(fileData));
}
//# sourceMappingURL=index.js.map