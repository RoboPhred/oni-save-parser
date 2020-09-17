# oni-save-parser

This library parses and writes save data from [Oxygen Not Included](https://www.klei.com/games/oxygen-not-included). It is intended for both nodejs and web environments (through webpack or rollup).

This is a utility library for editing saves. If you are looking for a way to edit your save files, you can do so using [Duplicity](https://github.com/RoboPhred/oni-duplicity).

## Game Compatibility

This library currently supports the Automation Innovation Update (save version 7.17).

This library intends to parse the most recent version of the save file as tracked by the stable (non-test) version of the game. Old versions will not be supported, and changes in test branches will not be integrated until the feature makes its way to the public stable version.

## API

- `parseOniSave(ArrayBuffer): SaveGame`
  Parses an ArrayBuffer of data into a save game object.

- `writeOniSave(SaveGame): ArrayBuffer`
  Writes a save game object into an array buffer.

### Typedefs

Typescript typedefs are included in this package, ready for use by typescript or any IDE that supports them.

## Design Philosophy

### Idempotent load-save cycle

This library intends to provide an idempotent load/save cycle: A save file that is loaded then written should generate a new file with identical content to the original. While the resulting file may differ due to implementation differences in the zlib compression library, the uncompressed content should be identical.

Due to this, the api uses arrays of key-value tuples rather than objects or Maps. This is required to guarantee the ordering of the elements remains the same.

The intent is to ensure as little data changes in the save as possible, to guard against potential cases where the ONI code makes assumptions or contains bugs regarding the ordering of data in data structures that might otherwise seem unordered.

A practical upshot of this is that the guaranteed order allows us to efficiently test the parser by round-trip loading and saving a file. By recording each parse instruction used when loading a file, we can ensure we receive the same write-equivalent instructions on saving. Any differences detected indicates that either the load or save operation is treating data differently than its counterpart, indicating a logic error. This check is made possible by the trampoline parser. See below for more information.

### Instruction-based 'trampoline' parser

Parsing and unparsing is done through functions that generate and yield instructions to a top level parser. This buys us several advantages:

- Ability to pause / delay / cancel / 'coroutine' the parse operation for environments that do not have threads.
- Ability to replace the parser with a test implementation to ensure the expected operations are being performed.
- Ability to inspect the parse progress, for use with progress reporting.
- Ability to include extranious information such as the current parse target, for use with progress reporting and error handling.

## Example usage

```
const { readFileSync } = require("fs");
const {
    parseSaveGame,
    writeSaveGame,
    AIAttributeLevelsBehavior
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

// Make all duplicants half-sized
const minions = saveData.gameObjects.find(x => x.name === "Minion")!;
for (const minion of minions.gameObjects) {
  minion.scale.x = 0.5;
  minion.scale.y = 0.5;
}

// Modify attributes of all duplicants
for (const minion of minions.gameObjects) {
  const skillBehavior = getBehavior(minion, AIAttributeLevelsBehavior);
  // Set each attribute to 10
  for (const attribute of skillBehavior.templateData.saveLoadLevels) {
    attribute.level = 10
  }
}

saveFile(`${fileName}-tweaked`, saveData);
```

## Current Progress

Data can be loaded by `parseOniSave(source: ArrayBuffer)`, and the data written out using `writeOniSave(save: OniSave): ArrayBuffer`.
Brand new saves cannot be created, as the world data format is not understood. This data is preserved as-is when a save is parsed then re-written.

The save file and all templated data objects are loaded.
This includes most of the interesting stuff, like duplicant stats, building attributes, and so on.
Some information is still not parsed, such as the general world map and some specific data for a few of
the more esoteric game objects.
