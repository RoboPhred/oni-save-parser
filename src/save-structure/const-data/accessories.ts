import { format } from "path";

export const ACCESSORY_ID_PREFIX = "Root.Accessories.";

export interface Accessory {
  guid: {
    /**
     * Note: Not an actual guid!  This is a string name of a nested resource,
     * such as ```Root.Accessories.eyes_003```.
     */
    Guid: string;
  };
}

export const AccessoryTypes = [
  "hat" as "hat",
  "hat_hair" as "hat_hair",
  "hair_always" as "hair_always",
  "hair" as "hair",
  "headshape" as "headshape",
  "eyes" as "eyes",
  "mouth" as "mouth",
  "neck" as "neck",
  "body" as "body",
  "arm" as "arm"
];

export type AccessoryType = typeof AccessoryTypes extends (infer R)[]
  ? R
  : never;

export const EyeAccessoryNames = [
  "eyes_001" as "eyes_001",
  "eyes_002" as "eyes_002",
  "eyes_003" as "eyes_003",
  "eyes_004" as "eyes_004",
  "eyes_005" as "eyes_005"
];

export const HeadshapeAccessoryNames = [
  "headshape_001" as "headshape_001",
  "headshape_002" as "headshape_002",
  "headshape_003" as "headshape_003",
  "headshape_004" as "headshape_004"
];

export const MouthAccessoryNames = [
  "mouth_001" as "mouth_001",
  "mouth_002" as "mouth_002",
  "mouth_003" as "mouth_003",
  "mouth_004" as "mouth_004"
];

export const HairAccessoryNames = [
  "hair_001" as "hair_001",
  "hair_002" as "hair_002",
  "hair_003" as "hair_003",
  "hair_004" as "hair_004",
  "hair_005" as "hair_005",
  "hair_006" as "hair_006",
  "hair_007" as "hair_007",
  "hair_008" as "hair_008",
  "hair_009" as "hair_009",
  "hair_010" as "hair_010",
  "hair_011" as "hair_011",
  "hair_012" as "hair_012",
  "hair_013" as "hair_013",
  "hair_014" as "hair_014",
  "hair_015" as "hair_015",
  "hair_016" as "hair_016",
  "hair_017" as "hair_017",
  "hair_018" as "hair_018",
  "hair_019" as "hair_019",
  "hair_020" as "hair_020",
  "hair_021" as "hair_021",
  "hair_022" as "hair_022",
  "hair_023" as "hair_023",
  "hair_027" as "hair_027",
  "hair_028" as "hair_028",
  "hair_029" as "hair_029",
  "hair_030" as "hair_030",
  "hair_031" as "hair_031",
  "hair_032" as "hair_032",
  "hair_033" as "hair_033"
];

export const BodyAccessoryNames = [
  "body_001" as "body_001",
  "body_002" as "body_002",
  "body_003" as "body_003",
  "body_004" as "body_004"
];

export const AccessoriesByType: Record<AccessoryType, string[] | null> = {
  body: BodyAccessoryNames,
  hat: null,
  hat_hair: null,
  hair_always: null,
  hair: HairAccessoryNames,
  headshape: HeadshapeAccessoryNames,
  eyes: EyeAccessoryNames,
  mouth: MouthAccessoryNames,
  neck: null,
  arm: null
};

export function Accessory(name: string): Accessory {
  let target: Accessory = (new.target || {}) as any;
  target.guid = {
    Guid: makeAccessoryID(name)
  };
  return target;
}

export function getIndexOfAccessoryType(
  accessories: Accessory[],
  type: AccessoryType
): number {
  return accessories.findIndex(acc => {
    const accType = getAccessoryType(acc);
    return type === accType;
  });
}

export function getAccessoryType(
  accessory: string | Accessory
): AccessoryType | null {
  const guid = accessoryToGuid(accessory);
  if (!guid || !guid.startsWith(ACCESSORY_ID_PREFIX)) {
    return null;
  }
  const id = guid.substr(ACCESSORY_ID_PREFIX.length);
  // Determining the type is a bit problematic, as we have
  //  some types that are prefixes of other types.
  // The game itself can resolve this as it looks up
  //  exact matches, but we need to be able to handle
  //  values we are not aware of.
  // Below is an attempt at a solution in which we find the longest
  //  matching type
  return AccessoryTypes.reduce((matchType: AccessoryType | null, type) => {
    if (
      id.startsWith(type + "_") &&
      (matchType == null || type.length > matchType.length)
    ) {
      return type;
    }
    return matchType;
  }, null);
}

export function getAccessoryName(accessory: string | Accessory): string | null {
  const guid = accessoryToGuid(accessory);
  if (!guid || !guid.startsWith(ACCESSORY_ID_PREFIX)) {
    return null;
  }
  return guid.substr(ACCESSORY_ID_PREFIX.length);
}

export function makeAccessoryID(name: string): string {
  return `${ACCESSORY_ID_PREFIX}${name}`;
}

export function getAccessoryOfType(
  accessories: Accessory[],
  type: AccessoryType
): Accessory | null {
  const index = getIndexOfAccessoryType(accessories, type);
  if (index === -1) return null;
  return accessories[index];
}

function accessoryToGuid(accessory: string | Accessory): string | undefined {
  if (typeof accessory === "string") {
    return accessory;
  }
  if (
    accessory.guid != null &&
    typeof accessory.guid === "object" &&
    typeof accessory.guid.Guid === "string"
  ) {
    return accessory.guid.Guid;
  }
  return undefined;
}
