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

export type MINION_IDENTITY_GENDERS = [
    "MALE",
    "FEMALE",
    "NB"
];

export type MINION_IDENTITY_VOICES = [
    0,
    1,
    2,
    3,
    4
];
