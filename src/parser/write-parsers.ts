import { WriteDataTypes, WriteInstruction } from "./write-instructions";
import { DataWriter } from "../binary-serializer";

type TypedWriteInstruction<T extends WriteDataTypes> = Extract<
  WriteInstruction,
  { dataType: T }
>;
type WriteParser<T extends WriteDataTypes> = (
  writer: DataWriter,
  inst: TypedWriteInstruction<T>
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
  "writer-position": r => r.position
};
export default writeParsers;

export function executeWriteInstruction<T extends WriteDataTypes>(
  writer: DataWriter,
  inst: TypedWriteInstruction<T>
): any {
  if (inst.type !== "write") {
    throw new Error("Expected a write parse instruction.");
  }

  const writeFunc = writeParsers[inst.dataType] as WriteParser<T>;
  return writeFunc(writer, inst);
}
