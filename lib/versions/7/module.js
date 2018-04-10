"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
// TODO: Export a set of prebuild composed modules
//  for different breaking-change save file versions.
const module_1 = require("../../logging/module");
const module_2 = require("../../oni-save/module");
const module_3 = require("../../save-header/module");
const module_4 = require("../../type-serializer/module");
const module_5 = require("../../save-body/module");
const module_6 = require("../../save-root/module");
const module_7 = require("../../game-settings/module");
const module_8 = require("../../game-state/module");
const module_9 = require("../../game-data/module");
exports.default = microinject_1.composeModules(module_1.createModule({
    trace: false,
    warn: false
}), module_2.createModule(), module_3.createModule(), module_4.createModule(), module_5.createModule(), module_6.createModule(), module_7.createModule(), module_8.createModule(), module_9.createModule());
//# sourceMappingURL=module.js.map