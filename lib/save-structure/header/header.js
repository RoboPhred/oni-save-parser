"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.headerSchema = void 0;
exports.headerSchema = {
    type: "object",
    properties: {
        buildVersion: {
            type: "number"
        },
        headerVersion: {
            type: "number"
        },
        isCompressed: {
            type: "boolean"
        },
        gameInfo: {
            type: "object"
        }
    },
    additionalProperties: false
};
//# sourceMappingURL=header.js.map