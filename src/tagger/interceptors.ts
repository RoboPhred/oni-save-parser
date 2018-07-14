import { ParseInterceptor } from "../parser/parse/parser";

import { TaggedParseInstruction } from "./instructions";

export function tagReporter(
  onTagStart: (tag: string, instanceName: string | null) => void,
  onTagEnd?: (tag: string, instanceName: string | null) => void
): ParseInterceptor {
  return (inst: TaggedParseInstruction) => {
    if (inst) {
      if (inst.type === "tagged-parse:start") {
        onTagStart(inst.tag, inst.instanceName || null);
      } else if (onTagEnd && inst.type === "tagged-parse:end") {
        onTagEnd(inst.tag, inst.instanceName || null);
      }
    }
    return inst;
  };
}
