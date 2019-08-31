export interface HashedString {
    hash: number;
}
export declare function HashedString(str: string): HashedString;
export declare function getHashedString(str: string): HashedString;
export declare type HashedStringEnum<T extends string> = Record<T, HashedString> & Record<number, T>;
export declare function createHashedStringEnum<T extends string>(strings: readonly T[]): HashedStringEnum<T>;
