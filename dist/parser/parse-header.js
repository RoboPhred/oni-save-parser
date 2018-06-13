"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const text_encoding_1 = require("text-encoding");
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
function parseHeader(reader) {
    const buildVersion = reader.readUInt32();
    const headerSize = reader.readUInt32();
    const headerVersion = reader.readUInt32();
    const isCompressed = headerVersion >= 1 ? Boolean(reader.readUInt32()) : false;
    const infoBytes = reader.readBytes(headerSize);
    const infoStr = new text_encoding_1.TextDecoder("utf-8").decode(infoBytes);
    const gameInfo = JSON.parse(infoStr);
    return {
        buildVersion,
        headerVersion,
        isCompressed,
        gameInfo
    };
}
exports.parseHeader = parseHeader;
function writeHeader(writer, header) {
    const { buildVersion, headerVersion, isCompressed, gameInfo } = header;
    const infoStr = JSON.stringify(gameInfo);
    const headerBytes = new text_encoding_1.TextEncoder("utf-8").encode(infoStr);
    writer.writeUInt32(buildVersion);
    writer.writeUInt32(headerBytes.byteLength);
    writer.writeUInt32(headerVersion);
    if (headerVersion >= 1) {
        writer.writeUInt32(isCompressed ? 1 : 0);
    }
    writer.writeBytes(headerBytes.buffer);
}
exports.writeHeader = writeHeader;
//# sourceMappingURL=parse-header.js.map