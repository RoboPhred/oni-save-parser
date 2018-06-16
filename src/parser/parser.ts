import { DataReader, DataWriter } from "../binary-serializer";

import { isReadInstruction } from "./read-instructions";
import { executeReadInstruction } from "./read-parsers";

import { isWriteInstruction } from "./write-instructions";
import { executeWriteInstruction } from "./write-parsers";

// Typescript currently does not support specifying the return value of an iterator.
//  We could use IterableIterator<ReadInstructions | T>, but that throws errors
//  when the parser delegates to sub-generators.
export type ParseIterator<T> = IterableIterator<any>;
export type WriteIterator = IterableIterator<any>;

export function parse<T>(reader: DataReader, readParser: ParseIterator<T>): T {
  let nextValue: any = undefined;
  while (true) {
    const { value, done } = readParser.next(nextValue);
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

export function write<T>(writer: DataWriter, writeParser: WriteIterator): T {
  let nextValue: any = undefined;
  while (true) {
    const { value, done } = writeParser.next(nextValue);
    if (isWriteInstruction(value)) {
      nextValue = executeWriteInstruction(writer, value);
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
