import { DataReader, ZlibDataReader } from "../../binary-serializer";

import {
  isReadInstruction,
  ReadDataTypes,
  ReadInstruction
} from "./read-instructions";
import { ParseError } from "../errors";
import { isMetaInstruction } from "../types";

// Typescript currently does not support specifying the return value of an iterator.
//  We could use IterableIterator<ReadInstructions | T>, but that throws errors
//  when the parser delegates to sub-generators.
export type ParseIterator<T> = IterableIterator<any>;
export type ParseInterceptor = (value: any) => any;

export function parse<T>(
  reader: DataReader,
  readParser: ParseIterator<T>,
  interceptor?: ParseInterceptor
): T {
  let nextValue: any = undefined;
  while (true) {
    let iteratorResult: IteratorResult<any>;
    try {
      iteratorResult = readParser.next(nextValue);
    } catch (e) {
      throw ParseError.create(e, reader.position);
    }

    let { value, done } = iteratorResult;
    value = interceptor ? interceptor(value) : value;

    if (!isMetaInstruction(value)) {
      if (isReadInstruction(value)) {
        try {
          nextValue = executeReadInstruction(reader, value, interceptor);
        } catch (e) {
          const err = ParseError.create(e, reader.position);
          throw err;
        }
      } else if (!done) {
        throw new Error("Cannot yield a non-parse-instruction.");
      } else {
        nextValue = value;
      }
    }

    if (done) {
      break;
    }
  }

  return nextValue;
}

type TypedReadInstruction<T extends ReadDataTypes> = Extract<
  ReadInstruction,
  { dataType: T }
>;

type ReadParser<T extends ReadDataTypes> = (
  reader: DataReader,
  inst: TypedReadInstruction<T>,
  interceptor?: ParseInterceptor
) => any;
type ReadParsers = { [P in ReadDataTypes]: ReadParser<P> };

const readParsers: ReadParsers = {
  byte: r => r.readByte(),
  "signed-byte": r => r.readSByte(),
  "byte-array": (r, i) =>
    i.length == null ? r.readAllBytes() : r.readBytes(i.length),
  "uint-16": r => r.readUInt16(),
  "int-16": r => r.readInt16(),
  "uint-32": r => r.readUInt32(),
  "int-32": r => r.readInt32(),
  "uint-64": r => r.readUInt64(),
  "int-64": r => r.readInt64(),
  single: r => r.readSingle(),
  double: r => r.readDouble(),
  chars: (r, i) => r.readChars(i.length),
  "klei-string": r => r.readKleiString(),
  "skip-bytes": (r, i) => r.skipBytes(i.length),
  compressed: (r, i, interceptor) => {
    const bytes = r.readAllBytes();
    const reader = new ZlibDataReader(new Uint8Array(bytes));
    const result = parse(reader, i.parser, interceptor);
    return result;
  },
  "reader-position": r => r.position
};

function executeReadInstruction<T extends ReadDataTypes>(
  reader: DataReader,
  inst: TypedReadInstruction<T>,
  interceptor?: ParseInterceptor
): any {
  if (inst.type !== "read") {
    throw new Error("Expected a read parse instruction.");
  }

  const readFunc = (readParsers[inst.dataType] as any) as ReadParser<T>;
  return readFunc(reader, inst, interceptor);
}
