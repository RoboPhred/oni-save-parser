import { ParseInterceptor } from "../parser/parse/parser";
export declare function tagReporter(onTagStart: (tag: string, instanceName: string | null) => void, onTagEnd?: (tag: string, instanceName: string | null) => void): ParseInterceptor;
