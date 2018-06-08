import { Identifier } from "microinject";

import {
  BinarySerializable,
  DataReader,
  DataWriter
} from "../../../binary-serializer";

import { JsonSerializable } from "../../../json-serializer";

import { TypeDescriptor, TypeTemplate, TypeID } from "./interfaces";

export interface TypeSerializationInfo<
  TType = any,
  TDescriptor extends TypeDescriptor<TType> = TypeDescriptor<TType>
> {
  id: TypeID;
  name: TDescriptor["name"];

  parseDescriptor(reader: DataReader): TDescriptor;
  writeDescriptor(writer: DataWriter, descriptor: TDescriptor): void;

  parseType(reader: DataReader, descriptor: TDescriptor): TType;
  writeType(writer: DataWriter, descriptor: TDescriptor, value: TType): void;
}
export const TypeSerializationInfo: Identifier<TypeSerializationInfo> = Symbol(
  "TypeSerializationInfo"
);

export interface TypeTemplateRegistry
  extends BinarySerializable,
    JsonSerializable<TypeTemplate[]> {
  has(templateName: string): boolean;
  get(templateName: string): TypeTemplate | undefined;
}
export const TypeTemplateRegistry: Identifier<TypeTemplateRegistry> = Symbol(
  "TypeTemplateRegistry"
);

export interface TypeDescriptorSerializer {
  parseDescriptor(reader: DataReader): TypeDescriptor;
  writeDescriptor(writer: DataWriter, descriptor: TypeDescriptor): void;
}
export const TypeDescriptorSerializer: Identifier<
  TypeDescriptorSerializer
> = Symbol("TypeDescriptorSerializer");

export interface TypeSerializer {
  parseType<T = any>(reader: DataReader, descriptor: TypeDescriptor<T>): T;
  writeType<T = any>(
    writer: DataWriter,
    descriptor: TypeDescriptor<T>,
    value: T
  ): void;
}
export const TypeSerializer: Identifier<TypeSerializer> = Symbol(
  "TypeSerializer"
);

export interface TypeTemplateSerializer {
  has(templateName: string): boolean;

  parseTemplatedType<T extends object = any>(
    reader: DataReader,
    templateName: string
  ): T;
  writeTemplatedType<T extends object = any>(
    writer: DataWriter,
    templateName: string,
    value: T
  ): void;
}
export const TypeTemplateSerializer: Identifier<
  TypeTemplateSerializer
> = Symbol("TypeTemplateSerializer");
