/**
 * Check if we parsed a meaningful .NET identifier name.
 * If the name looks valid, the name is returned.
 * If the name appears to not be valid, and error is thrown.
 * @param name The name to validate.
 */
export declare function validateDotNetIdentifierName(name: string | null | undefined): string;
export declare function typed<T extends string>(s: T): T;
export declare function typedKeys<T>(x: T): (keyof T)[];
