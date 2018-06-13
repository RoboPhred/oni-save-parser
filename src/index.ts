import {
  ArrayDataReader,
  ArrayDataWriter,
  ZlibDataReader
} from "./binary-serializer";

import { SaveGame, SaveGameHeader } from "./save-structure";

import { parse } from "./parser";

import { parseHeader, writeHeader } from "./save-parser/header";
import { parseTemplates } from "./save-parser/templates/index";
import { TypeTemplates } from "./save-structure/type-templates";
import { parseByTemplate } from "./save-parser/templates/type-parser";
import { SaveGameWorld } from "./save-structure/world";
import { parseWorld } from "./save-parser/world";
import { ParseContext } from "./parse-context";
import { SaveGameSettings } from "./save-structure/save-settings";
import { parseSaveSettings } from "./save-parser/save-settings";

const SAVE_HEADER = "KSAV";

const CURRENT_VERSION_MAJOR = 7;
const CURRENT_VERSION_MINOR = 3;

export function parseSaveGame(data: ArrayBuffer): SaveGame {
  let reader = new ArrayDataReader(data);

  const header = parse<SaveGameHeader>(reader, parseHeader());
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
      `Failed to parse SaveBody: Expected "${SAVE_HEADER}" but got "${ksav}" (${Array.from(
        ksav
      ).map(x => x.charCodeAt(0))})`
    );
  }

  const versionMajor = reader.readInt32();
  const versionMinor = reader.readInt32();

  return {
    header,
    templates,
    world,
    settings,
    versionMajor,
    versionMinor
  };
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

export function writeSaveGame(save: SaveGame): ArrayBuffer {
  const writer = new ArrayDataWriter();

  writeHeader(writer, save.header);

  return writer.getBytes();
}
