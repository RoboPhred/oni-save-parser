import {
  ArrayDataReader,
  ArrayDataWriter,
  ZlibDataReader,
  DataWriter,
  ZlibDataWriter
} from "./binary-serializer";

import {
  SaveGame,
  SaveGameHeader,
  GameObjectGroup,
  SaveGameData
} from "./save-structure";

import { parse, write } from "./parser";

import { parseHeader, writeHeader } from "./save-parser/header";
import { parseTemplates, writeTemplates } from "./save-parser/templates/index";
import { TypeTemplates } from "./save-structure/type-templates";
import {
  parseByTemplate,
  writeByTemplate
} from "./save-parser/templates/type-parser";
import { SaveGameWorld } from "./save-structure/world";
import { parseWorld, writeWorld } from "./save-parser/world";
import { ParseContext, WriteContext } from "./parse-context";
import { SaveGameSettings } from "./save-structure/save-settings";
import {
  parseSaveSettings,
  writeSaveSettings
} from "./save-parser/save-settings";
import { parseGameObjects, writeGameObjects } from "./save-parser/game-objects";
import { parseGameData, writeGameData } from "./save-parser/save-game-data";

export * from "./save-structure";
export * from "./data-types";

const SAVE_HEADER = "KSAV";

const CURRENT_VERSION_MAJOR = 7;
const CURRENT_VERSION_MINOR = 4;

export function parseSaveGame(data: ArrayBuffer): SaveGame {
  let reader = new ArrayDataReader(data);

  const header = parse<SaveGameHeader>(reader, parseHeader());

  const { saveMajorVersion, saveMinorVersion } = header.gameInfo;
  if (
    saveMajorVersion !== CURRENT_VERSION_MAJOR ||
    saveMinorVersion !== CURRENT_VERSION_MINOR
  ) {
    throw new Error(
      `Save version "${saveMajorVersion}.${saveMinorVersion}" is not compatible with this parser.  Expected version "${CURRENT_VERSION_MAJOR}.${CURRENT_VERSION_MINOR}".`
    );
  }

  const templates = parse<TypeTemplates>(reader, parseTemplates());

  if (header.isCompressed) {
    reader = new ZlibDataReader(reader.viewAllBytes());
  }

  const context = makeSaveParserContext(header, templates);

  const worldMarker = reader.readKleiString();
  if (worldMarker !== "world") {
    throw new Error(`Expected "world" string.`);
  }

  const world = parse<SaveGameWorld>(reader, parseWorld(context));
  const settings = parse<SaveGameSettings>(reader, parseSaveSettings(context));

  const ksav = reader.readChars(SAVE_HEADER.length);
  if (ksav !== SAVE_HEADER) {
    throw new Error(
      `Failed to parse ksav header: Expected "${SAVE_HEADER}" but got "${ksav}" (${Array.from(
        ksav
      ).map(x => x.charCodeAt(0))})`
    );
  }

  const versionMajor = reader.readInt32();
  const versionMinor = reader.readInt32();

  if (
    versionMajor !== CURRENT_VERSION_MAJOR ||
    versionMinor !== CURRENT_VERSION_MINOR
  ) {
    throw new Error(
      `Save version "${versionMajor}.${versionMinor}" is not compatible with this parser.  Expected version "${CURRENT_VERSION_MAJOR}.${CURRENT_VERSION_MINOR}".`
    );
  }

  const gameObjects = parse<GameObjectGroup[]>(
    reader,
    parseGameObjects(context)
  );

  const gameData = parse<SaveGameData>(reader, parseGameData(context));

  return {
    header,
    templates,
    world,
    settings,
    version: {
      major: versionMajor,
      minor: versionMinor
    },
    gameObjects,
    gameData
  };
}

export function writeSaveGame(save: SaveGame): ArrayBuffer {
  const writer = new ArrayDataWriter();

  write<SaveGameHeader>(writer, writeHeader(save.header));
  write<TypeTemplates>(writer, writeTemplates(save.templates));

  if (save.header.isCompressed) {
    const deflateWriter = new ZlibDataWriter();
    writeCompressedData(save, deflateWriter);
    writer.writeBytes(deflateWriter.getBytesView());
  } else {
    writeCompressedData(save, writer);
  }
  return writer.getBytes();
}

function writeCompressedData(save: SaveGame, writer: DataWriter) {
  const context = makeSaveWriterContext(save.header, save.templates);

  writer.writeKleiString("world");

  write<SaveGameWorld>(writer, writeWorld(save.world, context));
  write<SaveGameSettings>(writer, writeSaveSettings(save.settings, context));

  writer.writeChars(SAVE_HEADER);

  writer.writeInt32(save.version.major);
  writer.writeInt32(save.version.minor);

  write<GameObjectGroup[]>(writer, writeGameObjects(save.gameObjects, context));

  write(writer, writeGameData(save.gameData, context));
}

function makeSaveParserContext(
  header: SaveGameHeader,
  templates: TypeTemplates
): ParseContext {
  return {
    ...header,
    parseByTemplate: parseByTemplate.bind(null, templates)
  };
}

function makeSaveWriterContext(
  header: SaveGameHeader,
  templates: TypeTemplates
): WriteContext {
  return {
    ...header,
    writeByTemplate: writeByTemplate.bind(null, templates)
  };
}
