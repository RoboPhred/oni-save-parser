"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const deep_diff_1 = require("deep-diff");
const index_1 = require("../index");
const minimist_1 = __importDefault(require("minimist"));
const args = minimist_1.default(process.argv.slice(2), {
    boolean: "progress"
});
const showProgress = args.progress;
const fileName = args._[0] || "TestShennanigans";
console.log("Loading save");
const saveData = loadFile(fileName);
console.log("re-saving");
const writebackName = `${fileName}-writeback`;
saveFile(writebackName, saveData);
console.log("reloading");
const writebackData = loadFile(writebackName);
console.log("diffing");
const writebackDiff = checkDiff(saveData, writebackData);
console.log("changes:", writebackDiff && writebackDiff.length);
if (writebackDiff) {
    console.dir(writebackDiff);
}
console.log("tweaking");
const minions = saveData.gameObjects.find(x => x.name === "Minion");
for (const minion of minions.gameObjects) {
    minion.scale.x = 0.25;
    minion.scale.y = 3;
}
console.log("saving tweak");
saveFile(`${fileName}-tweaked`, saveData);
function checkDiff(original, modified) {
    original = Object.assign({}, original, { world: Object.assign({}, original.world, { streamed: null }) });
    modified = Object.assign({}, modified, { world: Object.assign({}, modified.world, { streamed: null }) });
    return deep_diff_1.diff(original, modified);
}
function loadFile(fileName) {
    const fileData = fs_1.readFileSync(`./test-data/${fileName}.sav`);
    const interceptor = showProgress
        ? index_1.progressReporter(console.log.bind(console, "LOADING"))
        : undefined;
    return index_1.parseSaveGame(fileData.buffer, interceptor);
}
function saveFile(fileName, save) {
    const interceptor = showProgress
        ? index_1.progressReporter(console.log.bind(console, "SAVING"))
        : undefined;
    const fileData = index_1.writeSaveGame(save, interceptor);
    fs_1.writeFileSync(`./test-data/${fileName}.sav`, new Uint8Array(fileData));
}
//# sourceMappingURL=index.js.map