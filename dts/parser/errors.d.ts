export declare class ParseError extends Error {
    dataOffset: number;
    cause?: () => Error;
    code?: string | number;
    constructor(message: string, dataOffset: number);
    static create(error: any, dataOffset: number): ParseError;
}
