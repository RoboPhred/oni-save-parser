"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
exports.MinionResumeBehavior = "MinionResume";
exports.APTITUDE_NAME_HASHES = {
    Farming: null,
    Ranching: null,
    Mining: null,
    Cooking: null,
    Art: null,
    Building: null,
    Management: null,
    Research: null,
    Suits: null,
    Hauling: null,
    Technicals: null,
    MedicalAid: null,
    Basekeeping: null
};
exports.APTITUDE_NAMES = Object.keys(exports.APTITUDE_NAME_HASHES);
exports.APTITUDE_HASH_NAMES = {};
for (let name of exports.APTITUDE_NAMES) {
    const hash = utils_1.getSDBMHash32(name.toLowerCase());
    exports.APTITUDE_HASH_NAMES[hash] = name;
    exports.APTITUDE_NAME_HASHES[name] = hash;
}
//# sourceMappingURL=minion-resume.js.map