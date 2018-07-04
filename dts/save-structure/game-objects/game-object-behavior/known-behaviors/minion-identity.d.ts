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
        bodyData: {
            headShape: {
                hash: number;
            };
            mouth: {
                hash: number;
            };
            neck: {
                hash: number;
            };
            eyes: {
                hash: number;
            };
            hair: {
                hash: number;
            };
            body: {
                hash: number;
            };
            arms: {
                hash: number;
            };
            hat: {
                hash: number;
            };
            hatHair: {
                hash: number;
            };
            hairAlways: {
                hash: number;
            };
        };
    };
}
export declare type MinionGender = "MALE" | "FEMALE" | "NB";
export declare const MINION_IDENTITY_GENDERS: MinionGender[];
export declare const MINION_IDENTITY_VOICES: number[];
