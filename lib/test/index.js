"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const microinject_1 = require("microinject");
const data_reader_1 = require("../data-reader");
const save_data_1 = require("../save-data");
const app_module_1 = __importDefault(require("./app-module"));
const fileData = fs_1.readFileSync("./test-data/Rancher-Test.sav");
const reader = new data_reader_1.ArrayDataReader(fileData.buffer);
const container = new microinject_1.Container();
container.load(app_module_1.default);
const saveData = container.get(save_data_1.OniSaveData);
saveData.parse(reader);
console.log(JSON.stringify(saveData, null, 2));
//# sourceMappingURL=index.js.map