"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getBehavior(gameObject, name) {
    return gameObject.behaviors.find(x => x.name === name);
}
exports.getBehavior = getBehavior;
//# sourceMappingURL=utils.js.map