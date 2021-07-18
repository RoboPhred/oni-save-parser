import {
  ParseIterator,
  UnparseIterator,
  readKleiString,
  readChars,
  readInt32,
  readCompressed,
  writeCompressed,
  writeKleiString,
  writeChars,
  writeInt32,
  readBytes,
  writeBytes,
} from "../parser";

import { ParseContext, WriteContext } from "./parse-context";

import { SaveGameHeader } from "./header";
import { parseHeader, unparseHeader } from "./header/parser";

import { TypeTemplates } from "./type-templates";
import {
  parseTemplates,
  unparseTemplates,
} from "./type-templates/template-parser";
import {
  parseByTemplate,
  unparseByTemplate,
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
import { validateVersion } from "./version-validator";

const SAVE_HEADER = "KSAV";

interface SaveGameBody {
  world: SaveGameWorld;
  settings: SaveGameSettings;
  simData: ArrayBuffer;
  version: {
    major: number;
    minor: number;
  };
  gameObjects: GameObjectGroup[];
  gameData: SaveGameData;
}

export interface SaveGameParserOptions {
  /**
   * How strict the parser should be in ensuring the correct save file version is used.
   * - "minor": Require the major and minor version to match.  This is the safest option.
   * - "major": Allow unknown minor versions as long as the major version matches.
   * - "none": Disable version checking.  This can result in corrupt data.
   */
  versionStrictness?: "none" | "major" | "minor";
}

export function* parseSaveGame(
  options: SaveGameParserOptions = {}
): ParseIterator<SaveGame> {
  const header: SaveGameHeader = yield* parseHeader();

  const { saveMajorVersion, saveMinorVersion } = header.gameInfo;
  const versionStrictness = options.versionStrictness || "minor";
  if (versionStrictness !== "none") {
    validateVersion(saveMajorVersion, saveMinorVersion, versionStrictness);
  }

  const templates: TypeTemplates = yield* parseTemplates();

  const context = makeSaveParserContext(header, templates);

  let body: SaveGameBody;

  if (header.isCompressed) {
    body = yield readCompressed(parseSaveBody(context));
  } else {
    body = yield* parseSaveBody(context);
  }

  const saveGame: SaveGame = {
    header,
    templates,
    ...body,
  };
  return saveGame;
}

function* parseSaveBody(context: ParseContext): ParseIterator<SaveGameBody> {
  const worldMarker = yield readKleiString();
  if (worldMarker !== "world") {
    throw new Error(`Expected "world" string.`);
  }

  const world: SaveGameWorld = yield* parseWorld(context);
  const settings: SaveGameSettings = yield* parseSettings(context);

  const simDataLength: number = yield readInt32();
  const simData: ArrayBuffer = yield readBytes(simDataLength);

  const ksav: string = yield readChars(SAVE_HEADER.length);
  if (ksav !== SAVE_HEADER) {
    throw new Error(
      `Failed to parse ksav header: Expected "${SAVE_HEADER}" but got "${ksav}" (${Array.from(
        ksav
      ).map((x) => x.charCodeAt(0))})`
    );
  }
  const versionMajor: number = yield readInt32();
  const versionMinor: number = yield readInt32();

  // The header contains this same data and validates it.
  // validateVersion(versionMajor, versionMinor);

  const gameObjects: GameObjectGroup[] = yield* parseGameObjects(context);

  const gameData: SaveGameData = yield* parseGameData(context);

  const body: SaveGameBody = {
    world,
    settings,
    simData,
    version: {
      major: versionMajor,
      minor: versionMinor,
    },
    gameObjects,
    gameData,
  };
  return body;
}

function makeSaveParserContext(
  header: SaveGameHeader,
  templates: TypeTemplates
): ParseContext {
  return {
    ...header,
    parseByTemplate: <T>(templateName: string) =>
      parseByTemplate<T>(templates, templateName),
  };
}

export function* unparseSaveGame(saveGame: SaveGame): UnparseIterator {
  yield* unparseHeader(saveGame.header);
  yield* unparseTemplates(saveGame.templates);

  const context = makeSaveWriterContext(saveGame.header, saveGame.templates);

  if (saveGame.header.isCompressed) {
    yield writeCompressed(unparseSaveBody(saveGame, context));
  } else {
    yield* unparseSaveBody(saveGame, context);
  }
}

function* unparseSaveBody(
  saveGame: SaveGame,
  context: WriteContext
): UnparseIterator {
  yield writeKleiString("world");

  yield* unparseWorld(saveGame.world, context);
  yield* unparseSettings(saveGame.settings, context);

  yield writeInt32(saveGame.simData.byteLength);
  yield writeBytes(saveGame.simData);

  yield writeChars(SAVE_HEADER);

  yield writeInt32(saveGame.version.major);
  yield writeInt32(saveGame.version.minor);

  yield* unparseGameObjects(saveGame.gameObjects, context);

  yield* writeGameData(saveGame.gameData, context);
}

function makeSaveWriterContext(
  header: SaveGameHeader,
  templates: TypeTemplates
): WriteContext {
  return {
    ...header,
    unparseByTemplate: unparseByTemplate.bind(null, templates),
  };
}
