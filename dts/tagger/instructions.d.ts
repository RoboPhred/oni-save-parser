import { ParserInstruction } from "../parser/types";
export interface TaggedParseInstruction extends ParserInstruction {
    type: "tagged-parse:start" | "tagged-parse:end";
    isMeta: true;
    tag: string;
    instanceName?: string;
}
export declare function taggedParseStart(tag: string, instanceName?: string): TaggedParseInstruction;
export declare function taggedParseEnd(tag: string, instanceName?: string): TaggedParseInstruction;
