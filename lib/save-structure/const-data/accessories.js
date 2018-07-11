"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ACCESSORY_PREFIX = "Root.Accessories.";
const TYPE_EXTRACTOR_REGEX = /^Root\.Accessories\.([a-zA-Z_]+)_(\d\d\d)$/;
exports.ACCESSORY_TYPES = [
    "eyes",
    "hair",
    "headshape",
    "mouth",
    "neck",
    "arm",
    "body",
    "hat"
];
exports.ACCESSORY_EYE_ORDINALS = [1, 2, 3, 4, 5];
exports.ACCESSORY_HEAD_ORDINALS = [1, 2, 3, 4];
exports.ACCESSORY_MOUTH_ORDINALS = [1, 2, 3, 4];
exports.ACCESSORY_HAIR_ORDINALS = [
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
exports.ACCESSORY_BODY_ORDINALS = [1, 2, 3, 4];
function Accessory(type, ordinal) {
    let target = (new.target || {});
    if (arguments.length === 1) {
        target.guid.Guid = type;
    }
    else {
        target.guid.Guid = makeAccessoryID(type, ordinal);
    }
    return target;
}
exports.Accessory = Accessory;
function getIndexOfAccessoryType(accessories, type) {
    return accessories.findIndex(acc => {
        const guid = acc.guid.Guid;
        const match = TYPE_EXTRACTOR_REGEX.exec(guid);
        if (!match)
            return false;
        return match[1] === type;
    });
}
exports.getIndexOfAccessoryType = getIndexOfAccessoryType;
function getAccessoryType(accessory) {
    accessory = accessoryToId(accessory);
    const match = TYPE_EXTRACTOR_REGEX.exec(accessory);
    if (!match)
        return null;
    return match[1];
}
exports.getAccessoryType = getAccessoryType;
function getAccessoryOrdinal(accessory) {
    accessory = accessoryToId(accessory);
    const match = TYPE_EXTRACTOR_REGEX.exec(accessory);
    if (!match)
        return null;
    // These all start at 1, so its safe to assume null here if we
    //  didn't parse a number.
    return Number(match[2]) || null;
}
exports.getAccessoryOrdinal = getAccessoryOrdinal;
function makeAccessory(type, ordinal) {
    return {
        guid: {
            Guid: makeAccessoryID(type, ordinal)
        }
    };
}
exports.makeAccessory = makeAccessory;
function makeAccessoryID(type, ordinal) {
    return `${ACCESSORY_PREFIX}${type}_${leftPad(ordinal, "0", 3)}`;
}
exports.makeAccessoryID = makeAccessoryID;
function getAccessoryOfType(accessories, type) {
    const index = getIndexOfAccessoryType(accessories, type);
    if (index === -1)
        return null;
    return accessories[index];
}
exports.getAccessoryOfType = getAccessoryOfType;
function accessoryToId(accessory) {
    if (typeof accessory === "string") {
        return accessory;
    }
    return accessory.guid.Guid;
}
function leftPad(str, pad, length) {
    str = String(str);
    if (pad.length == 0)
        return str;
    while (str.length < length) {
        str = pad + str;
    }
    return str;
}
//# sourceMappingURL=accessories.js.map