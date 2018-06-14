import {
  ReadDataTypes,
  ReadInstruction,
  ReadBytesInstruction
} from "./read-instructions";
import { DataReader } from "../binary-serializer";

type TypedReadInstruction<T extends ReadDataTypes> = Extract<
  ReadInstruction,
  { dataType: T }
>;

type ReadParser<T extends ReadDataTypes> = (
  reader: DataReader,
  inst: TypedReadInstruction<T>
) => any;
type ReadParsers = { [P in ReadDataTypes]: ReadParser<P> };

const readParsers: ReadParsers = {
  byte: r => r.readByte(),
  "signed-byte": r => r.readSByte(),
  "byte-array": (r, i) => r.readBytes(i.length),
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
  "reader-position": r => r.position
};
export default readParsers;

export function executeReadInstruction<T extends ReadDataTypes>(
  reader: DataReader,
  inst: TypedReadInstruction<T>
): any {
  if (inst.type !== "read") {
    throw new Error("Expected a read parse instruction.");
  }

  const readFunc = readParsers[inst.dataType] as ReadParser<T>;
  return readFunc(reader, inst);
}
