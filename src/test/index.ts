
import {
    readFileSync
} from "fs";

import {
    Container
} from "microinject";


import {
    ArrayDataReader
} from "../data-reader";

import {
    OniSaveData
} from "../save-data";

import appModule from "./app-module";

const fileData = readFileSync("./test-data/Rancher-Test.sav");
const reader = new ArrayDataReader(fileData.buffer);

const container = new Container();
container.load(appModule);

const saveData = container.get(OniSaveData);
saveData.parse(reader);

console.log(JSON.stringify(saveData, null, 2));