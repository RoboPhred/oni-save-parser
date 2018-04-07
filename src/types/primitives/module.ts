
import {
    ContainerModule,
    composeModules
} from "microinject";

import { readdirSync } from "fs";

// TODO: use webpack require.context
const files = readdirSync(__dirname);

const ignoreFiles = [
    ".",
    "..",
    "index.js",
    "module.js"
];


let modules: ContainerModule[] | null = null;
let cachedModule: ContainerModule | null = null;
export function createModule() {
    if (!modules || !cachedModule) {
        modules = [];
        for (let dir of files) {
            if (ignoreFiles.indexOf(dir) !== -1) {
                continue;
            }
            const subMod = require("./" + dir);
            if (!subMod || !subMod.createModule) {
                throw new Error(`Could not read primitive submodule: "${dir}"`);
            }
            modules.push(subMod.createModule());
        }
        cachedModule = composeModules(...modules);
    }
    return cachedModule;
}