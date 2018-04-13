/**
 * Hashes a string with the SDBM hashing algorithm,
 * then returns the signed 32 bit representation of the hash.
 * This is the algorithm ONI uses for HashString, whose values appear through the save file.
 * @param str The string to hash
 */
export declare function getSDBMHash32(str: string): number;
