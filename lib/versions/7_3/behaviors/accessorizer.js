"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ACCESSORY_PREFIX = "Root.Accessories.";
const TYPE_EXTRACTOR_REGEX = /^Root\.Accessories\.([a-zA-Z_]+)_(\d\d\d)$/;
exports.AccessorizerBehavior = "Accessorizer";
;
exports.EYES = [
    1,
    2,
    3,
    4,
    5
].map(x => makeAccessoryID("eyes", x));
exports.HEADS = [
    1,
    2,
    3,
    4
].map(x => makeAccessoryID("headshape", x));
exports.MOUTHS = [
    1,
    2,
    3,
    4
].map(x => makeAccessoryID("mouth", x));
exports.HAIRS = [
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
exports.BODIES = [
    1,
    2,
    3,
    4
].map(x => makeAccessoryID("body", x));
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
function getAccessoryType(accessoryID) {
    const match = TYPE_EXTRACTOR_REGEX.exec(accessoryID);
    if (!match)
        return null;
    return match[1];
}
exports.getAccessoryType = getAccessoryType;
function getAccessoryOrdinal(accessoryID) {
    const match = TYPE_EXTRACTOR_REGEX.exec(accessoryID);
    if (!match)
        return null;
    // These all start at 1, so its safe to assume null here if we
    //  didn't parse a number.
    return Number(match[2]) || null;
}
exports.getAccessoryOrdinal = getAccessoryOrdinal;
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
function leftPad(str, pad, length) {
    str = String(str);
    if (pad.length == 0)
        return str;
    while (str.length < length) {
        str = pad + str;
    }
    return str;
}
//# sourceMappingURL=accessorizer.js.map