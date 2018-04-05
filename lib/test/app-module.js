"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const logging_1 = require("../logging");
const save_data_1 = require("../save-data");
const save_header_1 = require("../save-header");
const type_templates_1 = require("../type-templates");
const game_state_1 = require("../game-state");
exports.default = microinject_1.composeModules(logging_1.createModule(), save_data_1.createModule(), save_header_1.createModule(), type_templates_1.createModule(), game_state_1.createModule());
//# sourceMappingURL=app-module.js.map