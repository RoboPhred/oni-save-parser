"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_types_1 = require("../../data-types");
exports.MinionRoleNames = {
    Farming: "Farming",
    Ranching: "Ranching",
    Mining: "Mining",
    Cooking: "Cooking",
    Art: "Art",
    Building: "Building",
    Management: "Management",
    Research: "Research",
    Suits: "Suits",
    Hauling: "Hauling",
    Technicals: "Technicals",
    MedicalAid: "MedicalAid",
    Basekeeping: "Basekeeping"
};
exports.MinionRoles = data_types_1.createHashedStringEnum(Object.keys(exports.MinionRoleNames));
//# sourceMappingURL=role-group.js.map