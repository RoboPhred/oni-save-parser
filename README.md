# oni-save-parser

Parses and writes save data from Oxygen Not Included. Supports NodeJS and Web (with polyfills).

This is a utility library for editing saves. If you are looking for a way to edit your save files, you can do so using [Duplicity](https://github.com/RoboPhred/oni-duplicity).

## Game Compatibility

As of version 2, this library only supports the cosmic update (save file version 7.4).

## Current Progress

Data can be loaded by `parseOniSave(source: ArrayBuffer)`, and the data written out using `writeOniSave(save: OniSave): ArrayBuffer`.
Brand new saves cannot be created, as the world data format is not understood. This data is preserved as-is when a save is parsed then re-written.

The save file and all templated data objects are loaded.
This includes most of the interesting stuff, like duplicant stats, building attributes, and so on.
Some information is still not parsed, such as the general world map and some specific data for a few of
the more esoteric game objects.

## Still to do

- Handle the special-case manual-parse data used by a few of the game object types.
- Better error handling: Errors should be specific error classes that describe the state of the parser and
  provide more details on why and where the error happened.

## Example usage

```
const {
    parseOniSave,
    writeOniSave
} = require("oni-save-parser");

function loadFile(fileName) {
  const fileData = readFileSync(`./test-data/${fileName}.sav`);
  return parseSaveGame(fileData.buffer);
}

function saveFile(fileName, save) {
  const fileData = writeSaveGame(save);
  writeFileSync(`./test-data/${fileName}.sav`, new Uint8Array(fileData));
}

const saveData = loadFile(fileName);

// Make all dups half-sized
const minions = saveData.gameObjects.find(x => x.name === "Minion")!;
for (const minion of minions.gameObjects) {
  minion.scale.x = 0.5;
  minion.scale.y = 0.5;
}

saveFile(`${fileName}-tweaked`, saveData);
```
