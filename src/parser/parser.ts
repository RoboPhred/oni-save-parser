import { DataReader } from "../binary-serializer";

import { ReadInstruction, isReadInstruction } from "./read-instructions";
import readParsers from "./read-parsers";

export type ParseIterator<T> = IterableIterator<ReadInstruction | T>;

export function parse<T>(reader: DataReader, parser: ParseIterator<T>): T {
  let nextValue: any = undefined;
  while (true) {
    const { value, done } = parser.next(nextValue);
    if (isReadInstruction(value)) {
      nextValue = executeReadInstruction(reader, value);
    } else if (!done) {
      throw new Error("Cannot yield a non-parse-instruction.");
    } else {
      nextValue = value;
    }

    if (done) {
      break;
    }
  }

  return nextValue;
}

function executeReadInstruction(
  reader: DataReader,
  inst: ReadInstruction
): any {
  if (inst.type !== "read") {
    throw new Error("Expected a read parse instruction.");
  }

  return readParsers[inst.dataType](reader, inst);
}
