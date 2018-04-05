
import {
    readFileSync,
    writeFileSync
} from "fs";

import {
    parseOniSave
} from "../index";

const fileData = readFileSync("./test-data/Rancher-Test.sav");

const saveData = parseOniSave(fileData.buffer);

const saveJson = saveData.toJSON() as any;
const streamData = saveJson["body"]["saveRoot"]["streamed"];
for (let key of Object.keys(streamData)) {
    streamData[key] = "<stream data>";
}

writeFileSync("./test-data/Rancher-Test.json", JSON.stringify(saveJson, null, 2));

console.log(JSON.stringify(saveJson, null, 2));