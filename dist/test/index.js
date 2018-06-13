"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const index_1 = require("../index");
const fileName = process.argv.length > 2 ? process.argv[2] : "TestShennanigans";
const fileData = fs_1.readFileSync(`./test-data/${fileName}.sav`);
console.log("Loading save");
const saveData = index_1.parseSaveGame(fileData.buffer);
debugger;
//# sourceMappingURL=index.js.map