import { readFileSync } from "fs";

import { parseSaveGame } from "../index";

const fileName = process.argv.length > 2 ? process.argv[2] : "TestShennanigans";
const fileData = readFileSync(`./test-data/${fileName}.sav`);

console.log("Loading save");
const saveData = parseSaveGame(fileData.buffer);
debugger;
