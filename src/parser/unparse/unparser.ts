import { DataWriter, ZlibDataWriter } from "../../binary-serializer";

import {
  isWriteInstruction,
  WriteDataTypes,
  WriteInstruction,
  DataLengthToken,
} from "./write-instructions";
import { ParseError } from "../errors";
import { isMetaInstruction } from "../types";

export type UnparseIterator = Generator<any, any, any>;
export type UnparseInterceptor = (value: any) => any;

export function unparse<T>(
  writer: DataWriter,
  unparser: UnparseIterator,
  interceptor?: UnparseInterceptor
): T {
  let nextValue: any = undefined;
  while (true) {
    let iteratorResult: IteratorResult<any>;
    try {
      iteratorResult = unparser.next(nextValue);
    } catch (e) {
      throw ParseError.create(e, writer.position);
    }
    let { value, done } = iteratorResult;
    value = interceptor ? interceptor(value) : value;

    if (!isMetaInstruction(value)) {
      if (isWriteInstruction(value)) {
        try {
          nextValue = executeWriteInstruction(writer, value, interceptor);
        } catch (e) {
          throw ParseError.create(e, writer.position);
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

type TypedWriteInstruction<T extends WriteDataTypes> = Extract<
  WriteInstruction,
  { dataType: T }
>;
type WriteParser<T extends WriteDataTypes> = (
  writer: DataWriter,
  inst: TypedWriteInstruction<T>,
  interceptor?: UnparseInterceptor
) => any;
type WriteParsers = { [P in WriteDataTypes]: WriteParser<P> };

const writeParsers: WriteParsers = {
  byte: (r, i) => r.writeByte(i.value),
  "signed-byte": (r, i) => r.writeSByte(i.value),
  "byte-array": (r, i) => r.writeBytes(i.value),
  "uint-16": (r, i) => r.writeUInt16(i.value),
  "int-16": (r, i) => r.writeInt16(i.value),
  "uint-32": (r, i) => r.writeUInt32(i.value),
  "int-32": (r, i) => r.writeInt32(i.value),
  "uint-64": (r, i) => r.writeUInt64(i.value),
  "int-64": (r, i) => r.writeInt64(i.value),
  single: (r, i) => r.writeSingle(i.value),
  double: (r, i) => r.writeDouble(i.value),
  chars: (r, i) => r.writeChars(i.value),
  "klei-string": (r, i) => r.writeKleiString(i.value),
  "writer-position": (r) => r.position,
  "data-length:begin": (r, i) => {
    const token: DataLengthToken = {
      writePosition: r.position,
      startPosition: i.startPosition != null ? i.startPosition : r.position,
    };
    r.writeInt32(0);
    return token;
  },
  "data-length:end": (r, i) =>
    r.replaceInt32(
      r.position - (i.token.startPosition + 4),
      i.token.writePosition
    ),
  compressed: (r, i, interceptor) => {
    const writer = new ZlibDataWriter();
    unparse(writer, i.unparser, interceptor);
    r.writeBytes(writer.getBytesView());
  },
};

function executeWriteInstruction<T extends WriteDataTypes>(
  writer: DataWriter,
  inst: TypedWriteInstruction<T>,
  interceptor?: UnparseInterceptor
): any {
  if (inst.type !== "write") {
    throw new Error("Expected a write parse instruction.");
  }

  const writeFunc = (writeParsers[inst.dataType] as any) as WriteParser<T>;
  return writeFunc(writer, inst, interceptor);
}
