import { readFileSync, writeFileSync } from "fs";

import { diff } from "deep-diff";

import { parseSaveGame, writeSaveGame } from "../index";
import { SaveGame } from "../save-structure";

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
const writebackDiff = diff(saveData, writebackData);
console.log("changes:", writebackDiff && writebackDiff.length);
if (writebackDiff) {
  console.dir(writebackDiff);
}

function loadFile(fileName: string): SaveGame {
  const fileData = readFileSync(`./test-data/${fileName}.sav`);
  return parseSaveGame(fileData.buffer);
}

function saveFile(fileName: string, save: SaveGame) {
  const fileData = writeSaveGame(save);
  writeFileSync(`./test-data/${fileName}.sav`, new Uint8Array(fileData));
}
