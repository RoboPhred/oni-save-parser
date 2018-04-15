import { BehaviorName } from "./interfaces";
import { GameObjectBehavior } from "../interfaces";

export const MinionIdentityBehavior: BehaviorName<MinionIdentityBehavior> = "MinionIdentity";
export interface MinionIdentityBehavior extends GameObjectBehavior {
    name: "MinionIdentity";
    parsedData: {
        name: string;
        nameStringKey: string;

        gender: "MALE" | "FEMALE" | "NB";
        genderStringKey: "MALE" | "FEMALE" | "NB";

        arrivalTime: number;

        voiceIdx: number;

        bodyData: {
            headShape: {
                hash: number;
            },
            mouth: {
                hash: number;
            },
            neck: {
                hash: number;
            },
            eyes: {
                hash: number;
            },
            hair: {
                hash: number;
            },
            body: {
                hash: number;
            },
            arms: {
                hash: number;
            },
            hat: {
                hash: number;
            },
            hatHair: {
                hash: number;
            },
            hairAlways: {
                hash: number;
            }
        };
    };
}

export const MINION_IDENTITY_GENDERS: string[] = [
    "MALE",
    "FEMALE",
    "NB"
];

export const MINION_IDENTITY_VOICES: number[] = [
    0,
    1,
    2,
    3,
    4
];
