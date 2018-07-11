const ACCESSORY_PREFIX = "Root.Accessories.";
const TYPE_EXTRACTOR_REGEX = /^Root\.Accessories\.([a-zA-Z_]+)_(\d\d\d)$/;

export interface Accessory {
  guid: {
    /**
     * Note: Not an actual guid!  This is a string name of a nested resource,
     * such as ```Root.Accessories.eyes_003```.
     */
    Guid: string;
  };
}

export const ACCESSORY_TYPES = [
  "eyes" as "eyes",
  "hair" as "hair",
  "headshape" as "headshape",
  "mouth" as "mouth",
  "neck" as "neck",
  "arm" as "arm",
  "body" as "body",
  "hat" as "hat"
];

export type AccessoryType = typeof ACCESSORY_TYPES extends (infer R)[]
  ? R
  : never;

export const ACCESSORY_EYE_ORDINALS = [1, 2, 3, 4, 5];

export const ACCESSORY_HEAD_ORDINALS = [1, 2, 3, 4];

export const ACCESSORY_MOUTH_ORDINALS = [1, 2, 3, 4];

export const ACCESSORY_HAIR_ORDINALS = [
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
];

export const ACCESSORY_BODY_ORDINALS = [1, 2, 3, 4];

export function Accessory(str: string): Accessory;
export function Accessory(type: AccessoryType, ordinal: number): Accessory;
export function Accessory(
  type: string | AccessoryType,
  ordinal?: number
): Accessory {
  let target: Accessory = (new.target || {}) as any;
  if (arguments.length === 1) {
    target.guid.Guid = type;
  } else {
    target.guid.Guid = makeAccessoryID(type as AccessoryType, ordinal!);
  }
  return target;
}

export function getIndexOfAccessoryType(
  accessories: Accessory[],
  type: AccessoryType
): number {
  return accessories.findIndex(acc => {
    const guid = acc.guid.Guid;
    const match = TYPE_EXTRACTOR_REGEX.exec(guid);
    if (!match) return false;
    return match[1] === type;
  });
}

export function getAccessoryType(
  accessory: string | Accessory
): AccessoryType | null {
  accessory = accessoryToId(accessory);
  const match = TYPE_EXTRACTOR_REGEX.exec(accessory);
  if (!match) return null;
  return match[1] as AccessoryType;
}

export function getAccessoryOrdinal(
  accessory: string | Accessory
): number | null {
  accessory = accessoryToId(accessory);
  const match = TYPE_EXTRACTOR_REGEX.exec(accessory);
  if (!match) return null;
  // These all start at 1, so its safe to assume null here if we
  //  didn't parse a number.
  return Number(match[2]) || null;
}

export function makeAccessory(type: AccessoryType, ordinal: number): Accessory {
  return {
    guid: {
      Guid: makeAccessoryID(type, ordinal)
    }
  };
}
export function makeAccessoryID(type: AccessoryType, ordinal: number): string {
  return `${ACCESSORY_PREFIX}${type}_${leftPad(ordinal, "0", 3)}`;
}

export function getAccessoryOfType(
  accessories: Accessory[],
  type: AccessoryType
): Accessory | null {
  const index = getIndexOfAccessoryType(accessories, type);
  if (index === -1) return null;
  return accessories[index];
}

function accessoryToId(accessory: string | Accessory): string {
  if (typeof accessory === "string") {
    return accessory;
  }
  return accessory.guid.Guid;
}

function leftPad(str: any, pad: string, length: number): string {
  str = String(str);
  if (pad.length == 0) return str;

  while (str.length < length) {
    str = pad + str;
  }

  return str;
}
