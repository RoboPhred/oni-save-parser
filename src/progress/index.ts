import { ProgressInstruction } from "./types";
import { ParseInterceptor } from "../parser";

export function reportProgress(message: string): ProgressInstruction {
  return {
    type: "progress",
    isMeta: true,
    message
  };
}

export function progressReporter(
  onProgress: (message: string) => void
): ParseInterceptor {
  return (instruction: ProgressInstruction) => {
    if (instruction && instruction.type === "progress") {
      onProgress(instruction.message);
    }
    return instruction;
  };
}
