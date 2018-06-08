"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Hashes a string with the SDBM hashing algorithm,
 * then returns the signed 32 bit representation of the hash.
 * This is the algorithm ONI uses for HashString, whose values appear through the save file.
 * @param str The string to hash
 */
function getSDBMHash32(str) {
    if (str == null) {
        return 0;
    }
    let num = 0;
    for (let index = 0; index < str.length; ++index) {
        // Need to re-cast to wrap.
        num = str.charCodeAt(index) + (num << 6) + (num << 16) - num;
    }
    return castInt32(num);
}
exports.getSDBMHash32 = getSDBMHash32;
// Because I dont feel like mathing today.
const int32Converter = new Int32Array(1);
function castInt32(val) {
    int32Converter.set([val]);
    return int32Converter[0];
}
//# sourceMappingURL=helpers.js.map