export declare class ParseError extends Error {
    dataOffset: number;
    cause?: () => Error;
    constructor(message: string, dataOffset: number);
    static create(error: any, dataOffset: number): ParseError;
}
