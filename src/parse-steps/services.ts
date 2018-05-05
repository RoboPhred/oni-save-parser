import { Identifier } from "microinject";

export interface ParseStepExecutor {
    do<R>(name: string, action: () => R): R;
    for<R>(name: string, count: number, action: (index: number) => R): R[];
    forEach<T, R>(name: string, items: T[], action: (item: T) => R): R[];
}
export const ParseStepExecutor: Identifier<ParseStepExecutor> = Symbol("ParseStepExecutor");

export interface ParseStepListener {
    onStart?(e: ParseStepEventArgs): void;
    onProgress?(e: ParseStepEventArgs): void;
    onEnd?(e: ParseStepEventArgs): void;
}
export const ParseStepListener: Identifier<ParseStepListener> = Symbol("ParseStepListener");

export interface ParseStepEventArgs {
    name: string;
    current?: number;
    max?: number;
}
