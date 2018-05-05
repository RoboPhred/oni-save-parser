import { ParseStepExecutor, ParseStepListener } from "./services";
export declare class ParseStepExecutorImpl implements ParseStepExecutor {
    private _listeners;
    private readonly _tokenStack;
    constructor(_listeners: ParseStepListener[]);
    do<T>(name: string, action: () => T): T;
    for<T>(name: string, count: number, action: (index: number) => T): T[];
    forEach<T, R>(name: string, items: T[], action: (item: T) => R): R[];
    private _begin(name, max?);
    private _next(token);
    private _end(token);
    private _announceStart(token);
    private _announceProgress(token);
    private _announceEnd(token);
}
