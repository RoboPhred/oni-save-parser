import { GameObjectBehavior } from "../interfaces";
import { BehaviorName } from "./interfaces";


const ACCESSORY_PREFIX = "Root.Accessories.";
const TYPE_EXTRACTOR_REGEX = /^Root\.Accessories\.([a-zA-Z_]+)_(\d\d\d)$/;

export const AccessorizerBehavior: BehaviorName<AccessorizerBehavior> = "Accessorizer";
export interface AccessorizerBehavior extends GameObjectBehavior {
    name: "Accessorizer",
    parsedData: {
        accessories: Accessory[];
    };
}
export interface Accessory {
    guid: {
        /**
         * Note: Not an actual guid!  This is a string name of a nested resource,
         * such as ```Root.Accessories.eyes_003```.
         */
        Guid: string;
    }
};

export const EYES: string[] = [
    1,
    2,
    3,
    4,
    5
].map(x =>  makeAccessoryID("eyes", x));

export const HEADS: string[] = [
    1,
    2,
    3,
    4
].map(x => makeAccessoryID("headshape", x));

export const MOUTHS: string[] = [
    1,
    2,
    3,
    4
].map(x => makeAccessoryID("mouth", x));

export const HAIRS: string[] = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    27,
    28,
    29,
    30,
    31,
    32,
    33
].map(x => makeAccessoryID("hair", x));

export const BODIES: string[] = [
    1,
    2,
    3,
    4
].map(x => makeAccessoryID("body", x));




export function getIndexOfAccessoryType(accessories: Accessory[], type: string): number {
    return accessories.findIndex(acc => {
        const guid = acc.guid.Guid;
        const match = TYPE_EXTRACTOR_REGEX.exec(guid);
        if (!match) return false;
        return match[1] === type;
    });
}

export function getAccessoryType(accessoryID: string): string | null {
    const match = TYPE_EXTRACTOR_REGEX.exec(accessoryID);
    if (!match) return null;
    return match[1];
}

export function getAccessoryOrdinal(accessoryID: string): number | null {
    const match = TYPE_EXTRACTOR_REGEX.exec(accessoryID);
    if (!match) return null;
    // These all start at 1, so its safe to assume null here if we
    //  didn't parse a number.
    return Number(match[2]) || null;
}

export function makeAccessoryID(type: string, ordinal: number): string {
    return `${ACCESSORY_PREFIX}${type}_${leftPad(ordinal, "0", 3)}`
}

export function getAccessoryOfType(accessories: Accessory[], type: string): Accessory | null {
    const index = getIndexOfAccessoryType(accessories, type);
    if (index === -1) return null;
    return accessories[index];
}

function leftPad(str: any, pad: string, length: number): string {
    str = String(str);
    if (pad.length == 0) return str;

    while (str.length < length) {
        str = pad + str;
    }

    return str;
}
