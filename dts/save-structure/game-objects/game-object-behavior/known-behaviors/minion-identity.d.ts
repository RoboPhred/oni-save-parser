import { AccessoryType } from "../../../const-data";
import { HashedString } from "../../../data-types";
import { GameObjectBehavior } from "../game-object-behavior";
import { BehaviorName } from "./types";
export declare const MinionIdentityBehavior: BehaviorName<MinionIdentityBehavior>;
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
export declare type MinionGender = "MALE" | "FEMALE" | "NB";
export declare const MINION_IDENTITY_GENDERS: MinionGender[];
export declare const MINION_IDENTITY_VOICES: number[];
export declare const MINION_IDENTITY_BODY_DATA_ACCESSORIES: Record<keyof BodyData, AccessoryType>;
