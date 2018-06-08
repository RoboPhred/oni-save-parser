import { injectable, inject, inScope } from "microinject";

import {
  ArrayDataWriter,
  DataReader,
  DataWriter
} from "../../../../../binary-serializer";

import { SaveGameScope } from "../../../services";

import { TypeID } from "../../interfaces";

import {
  TypeDescriptorSerializer,
  TypeSerializer,
  TypeSerializationInfo
} from "../../services";

import { HashSetTypeDescriptor } from "./descriptor";

@injectable(TypeSerializationInfo)
@inScope(SaveGameScope)
export class HashSetTypeSerializer
  implements TypeSerializationInfo<Set<any> | null, HashSetTypeDescriptor> {
  readonly id = TypeID.HashSet;
  readonly name = "hashset";

  constructor(
    @inject(TypeDescriptorSerializer)
    private _descriptorSerializer: TypeDescriptorSerializer,
    @inject(TypeSerializer) private _typeSerializer: TypeSerializer
  ) {}

  parseDescriptor(reader: DataReader): HashSetTypeDescriptor {
    const genericCount = reader.readByte();
    if (genericCount !== 1) {
      throw new Error(
        "Cannot parse HashSet descriptor: Expected 1 generic type."
      );
    }

    const itemType = this._descriptorSerializer.parseDescriptor(reader);

    return {
      name: this.name,
      itemType
    };
  }

  writeDescriptor(writer: DataWriter, descriptor: HashSetTypeDescriptor): void {
    writer.writeByte(1);
    this._descriptorSerializer.writeDescriptor(writer, descriptor.itemType);
  }

  parseType(
    reader: DataReader,
    descriptor: HashSetTypeDescriptor
  ): Set<any> | null {
    const elementType = descriptor.itemType;

    // data-length
    //  Note that if length is -1, this is 4 (the length of the count).
    //  If length is >= 0, this is the length of the element
    //  portion, NOT INCLUDING the count.
    reader.readInt32();

    // element-length
    const length = reader.readInt32();
    if (length === -1) {
      return null;
    } else if (length >= 0) {
      if (elementType.name === "byte") {
        const data = reader.readBytes(length);
        return new Set(Array.from(new Uint8Array(data)));
      } else {
        const elements = new Array(length);
        for (let i = 0; i < length; i++) {
          const element = this._typeSerializer.parseType(reader, elementType);
          elements[i] = element;
        }

        return new Set(elements);
      }
    } else {
      throw new Error(
        `Failed to parse array: Invalid length value of ${length}`
      );
    }
  }

  writeType(
    writer: DataWriter,
    descriptor: HashSetTypeDescriptor,
    value: Set<any> | null
  ): void {
    const elementType = descriptor.itemType;

    if (value == null) {
      // ONI inconsistancy: Element count is only included
      //  in the data-length when the array is null.
      writer.writeInt32(4);
      writer.writeInt32(-1);
    } else {
      // Despite ONI not making use of the data length, we still calculate it
      //  and store it against the day that it might be used.
      // TODO: Write directly to writer with ability to
      //  retroactively update data length.
      // TODO: Mantain element order for load/save cycle consistency.
      const elementWriter = new ArrayDataWriter();
      for (let element of value) {
        this._typeSerializer.writeType(elementWriter, elementType, element);
      }

      // ONI inconsistancy: Element count is not included
      //  in the data-length when the array is not null.
      writer.writeInt32(elementWriter.position);
      writer.writeInt32(value.size);
      writer.writeBytes(elementWriter.getBytesView());
    }
  }
}
