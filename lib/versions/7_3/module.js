"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const module_1 = require("../../oni-save/module");
const module_2 = require("../../save-header/module");
const module_3 = require("../../type-serializer/module");
const module_4 = require("../../save-body/module");
const module_5 = require("../../save-root/module");
const module_6 = require("../../game-settings/module");
const module_7 = require("../../game-state/module");
const module_8 = require("../../game-data/module");
exports.default = microinject_1.composeModules(module_1.createModule(), module_2.createModule(), module_3.createModule(), module_4.createModule(), module_5.createModule(), module_6.createModule(), module_7.createModule(), module_8.createModule());
//# sourceMappingURL=module.js.map