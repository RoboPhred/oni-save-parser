import {
  ZlibDataReader,
  DataReader,
  ArrayDataReader,
  ZlibDataWriter,
  ArrayDataWriter,
  DataWriter
} from "../binary-serializer";

import {
  ParseIterator,
  UnparseIterator,
  parse,
  unparse,
  readBytes,
  writeBytes
} from "../parser";

import { ParseContext, WriteContext } from "./parse-context";

import { SaveGameHeader } from "./header";
import { parseHeader, unparseHeader } from "./header/parser";

import { TypeTemplates } from "./type-templates";
import {
  parseTemplates,
  unparseTemplates
} from "./type-templates/template-parser";
import {
  parseByTemplate,
  unparseByTemplate
} from "./type-templates/template-data-parser";

import { SaveGameWorld } from "./world";
import { parseWorld, unparseWorld } from "./world/parser";

import { SaveGameSettings } from "./settings";
import { parseSettings, unparseSettings } from "./settings/parser";

import { GameObjectGroup } from "./game-objects";
import { parseGameObjects, unparseGameObjects } from "./game-objects/parser";

import { SaveGameData } from "./game-data";
import { parseGameData, writeGameData } from "./game-data/parser";
import { SaveGame } from "./save-game";

const SAVE_HEADER = "KSAV";

const CURRENT_VERSION_MAJOR = 7;
const CURRENT_VERSION_MINOR = 4;

export function* parseSaveGame(): ParseIterator<SaveGame> {
  const header: SaveGameHeader = yield* parseHeader();

  const { saveMajorVersion, saveMinorVersion } = header.gameInfo;
  if (
    saveMajorVersion !== CURRENT_VERSION_MAJOR ||
    saveMinorVersion !== CURRENT_VERSION_MINOR
  ) {
    throw new Error(
      `Save version "${saveMajorVersion}.${saveMinorVersion}" is not compatible with this parser.  Expected version "${CURRENT_VERSION_MAJOR}.${CURRENT_VERSION_MINOR}".`
    );
  }

  const templates: TypeTemplates = yield* parseTemplates();

  // TODO: Implement compression support at parser level; do not
  //  break the parse iterator chain with child parse calls.
  let reader: DataReader;
  if (header.isCompressed) {
    reader = new ZlibDataReader(yield readBytes());
  } else {
    reader = new ArrayDataReader(yield readBytes());
  }

  const context = makeSaveParserContext(header, templates);

  const worldMarker = reader.readKleiString();
  if (worldMarker !== "world") {
    throw new Error(`Expected "world" string.`);
  }

  const world = parse<SaveGameWorld>(reader, parseWorld(context));
  const settings = parse<SaveGameSettings>(reader, parseSettings(context));

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

  const saveGame: SaveGame = {
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
  return saveGame;
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

export function* unparseSaveGame(saveGame: SaveGame): UnparseIterator {
  yield* unparseHeader(saveGame.header);
  yield* unparseTemplates(saveGame.templates);

  // TODO: Implement compression support at parser level; do not
  //  break the parse iterator chain with child parse calls.
  const writer: DataWriter = saveGame.header.isCompressed
    ? new ZlibDataWriter()
    : new ArrayDataWriter();

  writeCompressedData(saveGame, writer);

  yield writeBytes(writer.getBytes());
}

function writeCompressedData(save: SaveGame, writer: DataWriter) {
  const context = makeSaveWriterContext(save.header, save.templates);

  writer.writeKleiString("world");

  unparse<SaveGameWorld>(writer, unparseWorld(save.world, context));
  unparse<SaveGameSettings>(writer, unparseSettings(save.settings, context));

  writer.writeChars(SAVE_HEADER);

  writer.writeInt32(save.version.major);
  writer.writeInt32(save.version.minor);

  unparse<GameObjectGroup[]>(
    writer,
    unparseGameObjects(save.gameObjects, context)
  );

  unparse(writer, writeGameData(save.gameData, context));
}

function makeSaveWriterContext(
  header: SaveGameHeader,
  templates: TypeTemplates
): WriteContext {
  return {
    ...header,
    unparseByTemplate: unparseByTemplate.bind(null, templates)
  };
}
