import { TextDecoder, TextEncoder } from "text-encoding";

import { validate } from "jsonschema";

import {
  ParseIterator,
  readUInt32,
  readBytes,
  writeUInt32,
  writeBytes,
  UnparseIterator
} from "../../parser";

import { SaveGameHeader, headerSchema } from "./header";

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

export function* unparseHeader(header: SaveGameHeader): UnparseIterator {
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
