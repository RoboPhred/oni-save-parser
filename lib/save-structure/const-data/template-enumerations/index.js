"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumerationsByName = void 0;
__exportStar(require("./health-state"), exports);
__exportStar(require("./sim-hashes"), exports);
const health_state_1 = require("./health-state");
const sim_hashes_1 = require("./sim-hashes");
exports.EnumerationsByName = {
    "Health+HealthState": health_state_1.HealthState,
    SimHashes: sim_hashes_1.SimHashes
};
//# sourceMappingURL=index.js.map