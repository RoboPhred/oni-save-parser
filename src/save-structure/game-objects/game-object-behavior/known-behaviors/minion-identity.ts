import { AccessoryType } from "../../../const-data";
import { HashedString } from "../../../data-types";

import { GameObjectBehavior } from "../game-object-behavior";

import { BehaviorName } from "./types";

export const MinionIdentityBehavior: BehaviorName<MinionIdentityBehavior> =
  "MinionIdentity";
export interface MinionIdentityBehavior extends GameObjectBehavior {
  name: "MinionIdentity";
  templateData: {
    name: string;
    nameStringKey: string;

    gender: MinionGender;
    genderStringKey: MinionGender;

    arrivalTime: number;

    voiceIdx: number;

    bodyData: BodyData;

    assignableProxy: {
      id: number;
    };
  };
}

export interface BodyData {
  headShape: HashedString;
  mouth: HashedString;
  neck: HashedString;
  eyes: HashedString;
  hair: HashedString;
  body: HashedString;
  arms: HashedString;
  hat: HashedString;
}

export type MinionGender = "MALE" | "FEMALE" | "NB";

export const MINION_IDENTITY_GENDERS: MinionGender[] = ["MALE", "FEMALE", "NB"];

export const MINION_IDENTITY_VOICES: number[] = [0, 1, 2, 3, 4];

export const MINION_IDENTITY_BODY_DATA_ACCESSORIES: Record<
  keyof BodyData,
  AccessoryType
> = {
  headShape: "headshape",
  mouth: "mouth",
  neck: "neck",
  eyes: "eyes",
  hair: "hair",
  body: "body",
  arms: "arm",
  hat: "hat"
};
