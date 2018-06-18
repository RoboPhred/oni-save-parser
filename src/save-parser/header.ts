import { TextDecoder, TextEncoder } from "text-encoding";

import { Schema, validate } from "jsonschema";

import {
  ParseIterator,
  readBytes,
  readUInt32,
  writeUInt32,
  writeBytes,
  WriteIterator
} from "../parser";

import { SaveGameHeader } from "../save-structure";

export const headerSchema: Schema = {
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

export function* parseHeader(): ParseIterator<SaveGameHeader> {
  const buildVersion = yield readUInt32();
  const headerSize = yield readUInt32();
  const headerVersion = yield readUInt32();
  const isCompressed = headerVersion >= 1 ? Boolean(yield readUInt32()) : false;

  const infoBytes = yield readBytes(headerSize);
  const infoStr = new TextDecoder("utf-8").decode(infoBytes);
  const gameInfo = JSON.parse(infoStr);

  const header: SaveGameHeader = {
    buildVersion,
    headerVersion,
    isCompressed,
    gameInfo
  };
  return header;
}

export function* writeHeader(header: SaveGameHeader): WriteIterator {
  validate(header, headerSchema, { throwError: true });

  const { buildVersion, headerVersion, isCompressed, gameInfo } = header;

  const infoStr = JSON.stringify(gameInfo);
  const headerBytes = new TextEncoder("utf-8").encode(infoStr);

  yield writeUInt32(buildVersion);
  yield writeUInt32(headerBytes.byteLength);
  yield writeUInt32(headerVersion);
  if (headerVersion >= 1) {
    yield writeUInt32(isCompressed ? 1 : 0);
  }

  yield writeBytes(headerBytes.buffer);
}
