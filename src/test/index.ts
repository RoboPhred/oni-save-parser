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
const writebackDiff = checkDiff(saveData, writebackData);
console.log("changes:", writebackDiff && writebackDiff.length);
if (writebackDiff) {
  console.dir(writebackDiff);
}

console.log("tweaking");
const minions = saveData.gameObjects.find(x => x.name === "Minion")!;
for (const minion of minions.gameObjects) {
  minion.scale.x = 0.25;
  minion.scale.y = 3;
}
console.log("saving tweak");
saveFile(`${fileName}-tweaked`, saveData);

function checkDiff(original: SaveGame, modified: SaveGame) {
  original = {
    ...original,
    world: {
      ...original.world,
      streamed: null as any
    }
  };
  modified = {
    ...modified,
    world: {
      ...modified.world,
      streamed: null as any
    }
  };
  return diff(original, modified);
}

function loadFile(fileName: string): SaveGame {
  const fileData = readFileSync(`./test-data/${fileName}.sav`);
  return parseSaveGame(fileData.buffer);
}

function saveFile(fileName: string, save: SaveGame) {
  const fileData = writeSaveGame(save);
  writeFileSync(`./test-data/${fileName}.sav`, new Uint8Array(fileData));
}
