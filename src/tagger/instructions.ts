import { ParserInstruction } from "../parser/types";

export interface TaggedParseInstruction extends ParserInstruction {
  type: "tagged-parse:start" | "tagged-parse:end";
  isMeta: true;
  tag: string;
  instanceName?: string;
}

export function taggedParseStart(
  tag: string,
  instanceName?: string
): TaggedParseInstruction {
  return {
    type: "tagged-parse:start",
    isMeta: true,
    tag,
    instanceName
  };
}

export function taggedParseEnd(
  tag: string,
  instanceName?: string
): TaggedParseInstruction {
  return {
    type: "tagged-parse:end",
    isMeta: true,
    tag,
    instanceName
  };
}
