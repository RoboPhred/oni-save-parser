# oni-save-parser

Parses save data from Oxygen Not Included.  Supports NodeJS and (eventually) Web.

Currently under development

## Game Compatibility

This should work for all save files up to the Rancher Update (save file version 7.3).

## Library Compatibility

This project makes use of some ES6 constructs such as Symbols, and a few nodejs libraries.
The most intrusive external dependency is on node's builtin zlib module.  This should be shimmed on the web
using something like [browserify-zlib](https://www.npmjs.com/package/browserify-zlib).

A webpack build will be produced and included later on.

## Current Progress

The save file and all templated data objects are loaded.
This includes most of the interesting stuff, like duplicant stats, building attributes, and so on.
Some information is still not parsed, such as the general world map and some specific data for a few of
the more esoteric game objects.

At the moment, this library is not capable of saving the modified save data.  This should be comming soon.

## Still to do
- Typedefs for the json-format save data (```OniSave.toJSON()```).
- Save logic.
- Handle the special-case manual-parse data used by a few of the game object types.
- Better error handling: Errors should be specific error classes that describe the state of the parser and
    provide more details on why and where the error happened.
- Webpack build.

## Example usage

```
const {
    readFileSync,
    writeFileSync
} = require("fs");

const {
    parseOniSave
} = require("oni-save-parser");

const savePath = "./my-save.sav";
const outputPath = "./my-save.json";

const fileData = readFileSync(savePath);

// Note that parseOniSave takes an ArrayBuffer, not a node Buffer.
//  We can get the ArrayBuffer out of a Buffer by using the buffer property.
const saveData = parseOniSave(fileData.buffer);


const saveJson = saveData.toJSON() as any;

// This object contains the binary blobs that represent
//  the game map, camera position, visibility, and tile damage.
// This includes a lot of opaque binary arrays that we currently
//  can't do anything with.
// Wipe the data from the save object so we do not
//  make the file impossibly large and difficult to edit.
const streamData = saveJson["body"]["saveRoot"]["streamed"];
for (let key of Object.keys(streamData)) {
    streamData[key] = "<stream data>";
}

writeFileSync(outputPath, JSON.stringify(saveJson, null, 2));
```


## Design

This library makes use of dependency injection.  Mostly to provide an easy way to swap out save file
components as new versions make breaking changes, but really because I wanted to test my IoC library.
Objects dealing with save data are scoped under the root OniSaveData for the load, allowing
easy access to things like the logger or type template deserializer wherever they may be needed.

## Future Plans

I intend to eventually make an in-browser save editor that works on the files locally.  Maybe.  If I get to it.