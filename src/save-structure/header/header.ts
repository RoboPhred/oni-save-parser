import { Schema } from "jsonschema";

export interface SaveGameHeader {
  buildVersion: number;
  headerVersion: number;
  isCompressed: boolean;
  gameInfo: SaveGameInfo;
}

/**
 * Class: "SaveGame+GameInfo"
 * Parser: "SaveGame.GetGameInfo(byte[] bytes)"
 */
export interface SaveGameInfo {
  numberOfCycles: number;
  numberOfDuplicants: number;
  baseName: string;
  isAutoSave: boolean;
  originalSaveName: string;
  saveMajorVersion: number;
  saveMinorVersion: number;
  clusterId: string;
  //worldTraits: null; // Not sure what this is
  sandboxEnabled: boolean;
  colonyGuid: string;
  dlcId: string;
}

export const headerSchema: Schema = {
  type: "object",
  properties: {
    buildVersion: {
      type: "number",
    },
    headerVersion: {
      type: "number",
    },
    isCompressed: {
      type: "boolean",
    },
    gameInfo: {
      type: "object",
    },
  },
  additionalProperties: false,
};
