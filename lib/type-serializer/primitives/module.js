"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
// TODO: use webpack require.context()
const module_1 = require("./array/module");
const module_2 = require("./boolean/module");
const module_3 = require("./byte/module");
const module_4 = require("./colour/module");
const module_5 = require("./dictionary/module");
const module_6 = require("./double/module");
const module_7 = require("./enumeration/module");
const module_8 = require("./hashset/module");
const module_9 = require("./int16/module");
const module_10 = require("./int32/module");
const module_11 = require("./int64/module");
const module_12 = require("./list/module");
const module_13 = require("./pair/module");
const module_14 = require("./sbyte/module");
const module_15 = require("./single/module");
const module_16 = require("./string/module");
const module_17 = require("./uint16/module");
const module_18 = require("./uint32/module");
const module_19 = require("./uint64/module");
const module_20 = require("./vector2/module");
const module_21 = require("./vector2I/module");
const module_22 = require("./vector3/module");
function createModule() {
    return microinject_1.composeModules(module_1.createModule(), module_2.createModule(), module_3.createModule(), module_4.createModule(), module_5.createModule(), module_6.createModule(), module_7.createModule(), module_8.createModule(), module_9.createModule(), module_10.createModule(), module_11.createModule(), module_12.createModule(), module_13.createModule(), module_14.createModule(), module_15.createModule(), module_16.createModule(), module_17.createModule(), module_18.createModule(), module_19.createModule(), module_20.createModule(), module_21.createModule(), module_22.createModule());
}
exports.createModule = createModule;
//# sourceMappingURL=module.js.map