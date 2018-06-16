# oni-save-parser

Parses and writes save data from Oxygen Not Included. Supports NodeJS and Web (with polyfills).

Currently under development

## Game Compatibility

This should work for all save files up to the Rancher Update (save file version 7.3).

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

const fileData = readFileSync("./test-data/Rancher-Test.sav");

const saveData = parseOniSave(fileData.buffer);

const minions = saveData.body.gameState.gameObjects.get("Minion");
for(let minion of minions) {
    // Change every minion to 1/3 the size.
    minion["scale"]["x"] = 0.3;
    minion["scale"]["y"] = 0.3;
    minion["scale"]["z"] = 0.3;

    // Set all attribute levels to 100.
    const attrBehavior = minion["behaviors"].find(x => x["name"] === "Klei.AI.AttributeLevels");
    const levels = attrBehavior["parsedData"].saveLoadLevels;
    levels.forEach(x => x["level"] = 100);
}

const writeData = writeOniSave(saveData);
writeFileSync("./test-data/writeback.sav", new Uint8Array(writeData));
```
