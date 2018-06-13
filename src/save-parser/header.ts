import { TextDecoder, TextEncoder } from "text-encoding";

import { Schema, validate } from "jsonschema";

import { DataReader, DataWriter } from "../binary-serializer";

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

export function parseHeader(reader: DataReader): SaveGameHeader {
  const buildVersion = reader.readUInt32();
  const headerSize = reader.readUInt32();
  const headerVersion = reader.readUInt32();
  const isCompressed =
    headerVersion >= 1 ? Boolean(reader.readUInt32()) : false;

  const infoBytes = reader.readBytes(headerSize);
  const infoStr = new TextDecoder("utf-8").decode(infoBytes);
  const gameInfo = JSON.parse(infoStr);

  return {
    buildVersion,
    headerVersion,
    isCompressed,
    gameInfo
  };
}

export function writeHeader(writer: DataWriter, header: SaveGameHeader) {
  validate(header, headerSchema, { throwError: true });

  const { buildVersion, headerVersion, isCompressed, gameInfo } = header;

  const infoStr = JSON.stringify(gameInfo);
  const headerBytes = new TextEncoder("utf-8").encode(infoStr);

  writer.writeUInt32(buildVersion);
  writer.writeUInt32(headerBytes.byteLength);
  writer.writeUInt32(headerVersion);
  if (headerVersion >= 1) {
    writer.writeUInt32(isCompressed ? 1 : 0);
  }

  writer.writeBytes(headerBytes.buffer);
}
