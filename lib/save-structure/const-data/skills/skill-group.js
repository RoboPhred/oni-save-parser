"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinionSkillGroup = exports.MinionSkillGroupNames = void 0;
const data_types_1 = require("../../data-types");
exports.MinionSkillGroupNames = [
    "Farming",
    "Ranching",
    "Mining",
    "Cooking",
    "Art",
    "Building",
    "Management",
    "Research",
    "Suits",
    "Hauling",
    "Technicals",
    "MedicalAid",
    "Basekeeping"
];
exports.MinionSkillGroup = data_types_1.createHashedStringEnum(exports.MinionSkillGroupNames);
//# sourceMappingURL=skill-group.js.map