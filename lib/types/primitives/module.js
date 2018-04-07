"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const fs_1 = require("fs");
// TODO: use webpack require.context
const files = fs_1.readdirSync(__dirname);
const ignoreFiles = [
    ".",
    "..",
    "index.js",
    "module.js"
];
let modules = null;
let cachedModule = null;
function createModule() {
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
        cachedModule = microinject_1.composeModules(...modules);
    }
    return cachedModule;
}
exports.createModule = createModule;
//# sourceMappingURL=module.js.map