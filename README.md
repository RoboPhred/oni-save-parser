# oni-save-parser

Parses and writes save data from Oxygen Not Included. Supports NodeJS and Web (with polyfills).

This is a utility library for editing saves. If you are looking for a way to edit your save files, you can do so using [Duplicity](https://github.com/RoboPhred/oni-duplicity).

## Game Compatibility

This should work for all save files up to the Rancher Update (save file version 7.3).

## Library Compatibility

This project makes use of some newer constructs such as Set, Map, and Symbol. It should be supported
when these constructs are present.

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

## Design

This library makes use of dependency injection. Mostly to provide an easy way to swap out save file
components as new versions make breaking changes, but really because I wanted to test my IoC library.
Objects dealing with save data are scoped under the root OniSaveData for the load, allowing
easy access to things like the logger or type template deserializer wherever they may be needed.
