"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const lodash_flowright_1 = __importDefault(require("lodash.flowright"));
const deep_diff_1 = require("deep-diff");
const index_1 = require("../index");
const save_structure_1 = require("../save-structure");
const minimist_1 = __importDefault(require("minimist"));
const currentTagPath = [];
const args = minimist_1.default(process.argv.slice(2), {
    boolean: ["progress", "progress-tags"]
});
const showProgress = args.progress;
const showTags = args["progress-tags"];
const fileName = args._[0] || "TestShennanigans";
console.log("Loading save");
const saveData = loadFile(fileName);
const modifiers = save_structure_1.getBehavior(saveData.gameObjects.find(x => x.name === "Minion").gameObjects[0], save_structure_1.MinionModifiersBehavior);
console.log("modifiers", JSON.stringify(modifiers, null, 2));
console.log("re-saving");
const writebackName = `${fileName}-writeback`;
saveFile(writebackName, saveData);
console.log("reloading");
const writebackData = loadFile(writebackName);
console.log("diffing");
const writebackDiff = checkDiff(saveData, writebackData);
const hasChanges = writebackDiff && writebackDiff.length;
if (hasChanges) {
    console.error("Changes detected");
    console.dir(writebackDiff);
    process.exit(1);
}
console.log("Seen objects:\n", saveData.gameObjects.map(x => x.name).join("\n"));
console.log("done");
function checkDiff(original, modified) {
    original = Object.assign({}, original, { world: Object.assign({}, original.world, { streamed: null }) });
    modified = Object.assign({}, modified, { world: Object.assign({}, modified.world, { streamed: null }) });
    return deep_diff_1.diff(original, modified);
}
function loadFile(fileName) {
    const fileData = fs_1.readFileSync(`./test-data/${fileName}.sav`);
    let interceptors = [];
    if (showProgress) {
        interceptors.push(index_1.progressReporter(console.log.bind(console, "LOADING")));
    }
    if (showTags) {
        interceptors.push(index_1.tagReporter(console.log.bind(console, "LOAD-TAG-START"), console.log.bind(console, "LOAD-TAG-END")));
    }
    const interceptor = lodash_flowright_1.default((x) => x, ...interceptors);
    try {
        return index_1.parseSaveGame(fileData.buffer, interceptor);
    }
    catch (e) {
        console.error(`Load error at ${currentTagPath.join(" => ")}`);
        e.tagPath = [...currentTagPath];
        throw e;
    }
}
function saveFile(fileName, save) {
    let interceptors = [];
    if (showProgress) {
        interceptors.push(index_1.progressReporter(console.log.bind(console, "SAVING")));
    }
    interceptors.push(index_1.tagReporter(onTagStart, onTagEnd));
    const interceptor = lodash_flowright_1.default((x) => x, ...interceptors);
    try {
        const fileData = index_1.writeSaveGame(save, interceptor);
        fs_1.writeFileSync(`./test-data/${fileName}.sav`, new Uint8Array(fileData));
    }
    catch (e) {
        console.error(`Save error at ${currentTagPath.join(" => ")}`);
        e.tagPath = [...currentTagPath];
        throw e;
    }
}
function onTagStart(tagName, instanceName) {
    if (showTags) {
        console.log("TAG_START", tagName, instanceName);
    }
    const part = instanceName ? `${tagName}::${instanceName}` : tagName;
    currentTagPath.push(part);
}
function onTagEnd(tagName, instanceName) {
    if (showTags) {
        console.log("TAG_END", tagName, instanceName);
    }
    const part = instanceName ? `${tagName}::${instanceName}` : tagName;
    if (currentTagPath[currentTagPath.length - 1] !== part) {
        debugger;
    }
    currentTagPath.pop();
}
//# sourceMappingURL=index.js.map