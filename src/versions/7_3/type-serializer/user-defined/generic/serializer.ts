import { inject, injectable, inScope } from "microinject";

import { validateDotNetIdentifierName } from "../../../../../utils";

import {
  ArrayDataWriter,
  DataReader,
  DataWriter
} from "../../../../../binary-serializer";

import { SaveGameScope } from "../../../services";

import { TypeDescriptor, TypeID } from "../../interfaces";

import {
  TypeSerializationInfo,
  TypeTemplateSerializer,
  TypeDescriptorSerializer,
  TypeTemplateRegistry
} from "../../services";

import { UserDefinedGenericTypeDescriptor } from "./descriptor";

@injectable(TypeSerializationInfo)
@inScope(SaveGameScope)
export class UserDefinedGenericTypeSerializer
  implements
    TypeSerializationInfo<
      object | null,
      UserDefinedGenericTypeDescriptor<object>
    > {
  readonly id = TypeID.UserDefinedGeneric;
  readonly name = "user-defined-generic";

  constructor(
    @inject(TypeTemplateRegistry)
    private _templateRegistry: TypeTemplateRegistry,
    @inject(TypeDescriptorSerializer)
    private _descriptorSerializer: TypeDescriptorSerializer,
    @inject(TypeTemplateSerializer)
    private _templateSerializer: TypeTemplateSerializer
  ) {}

  parseDescriptor(
    reader: DataReader
  ): UserDefinedGenericTypeDescriptor<object> {
    const templateName = validateDotNetIdentifierName(reader.readKleiString());

    // Generic type.  Read in the generics.
    //  This is performed after we fetch the template name.
    const genericCount = reader.readByte();
    const genericTypes: TypeDescriptor[] = new Array(genericCount);
    for (let i = 0; i < genericCount; i++) {
      const type = this._descriptorSerializer.parseDescriptor(reader);
      genericTypes[i] = type;
    }

    return {
      name: this.name,
      templateName,
      genericTypes
    };
  }

  writeDescriptor(
    writer: DataWriter,
    descriptor: UserDefinedGenericTypeDescriptor<object>
  ): void {
    const { templateName, genericTypes } = descriptor;

    validateDotNetIdentifierName(templateName);
    if (!genericTypes) {
      throw new Error(
        "Failed to write object: Generic object has no generic type data."
      );
    }

    writer.writeKleiString(descriptor.templateName);

    // Generic type.  Write out the generics.
    //  This is performed after we write the template name.
    writer.writeByte(genericTypes.length);
    for (let type of genericTypes) {
      this._descriptorSerializer.writeDescriptor(writer, type);
    }
  }

  parseType(
    reader: DataReader,
    descriptor: UserDefinedGenericTypeDescriptor<object>
  ): object | null {
    const templateName = descriptor.templateName;
    const template = this._templateRegistry.get(templateName);
    if (!template) {
      throw new Error(
        `Failed to parse object: Template name "${templateName}" is not in the template registry.`
      );
    }

    const dataLength = reader.readInt32();
    if (dataLength < 0) {
      return null;
    }

    const parseStart = reader.position;

    const obj = this._templateSerializer.parseTemplatedType(
      reader,
      templateName
    );

    const parseLength = reader.position - parseStart;
    if (parseLength !== dataLength) {
      throw new Error(
        `Failed to parse object: Template name "${templateName}" parsed ${Math.abs(
          parseLength - dataLength
        )} ${parseLength > dataLength ? "more" : "less"} than expected.`
      );
    }

    return obj;
  }

  writeType(
    writer: DataWriter,
    descriptor: UserDefinedGenericTypeDescriptor<object>,
    value: object | null
  ): void {
    const templateName = descriptor.templateName;
    const template = this._templateRegistry.get(templateName);
    if (!template) {
      throw new Error(
        `Failed to write object: Template name "${templateName}" is not in the template registry.`
      );
    }

    if (value == null) {
      writer.writeInt32(-1);
    } else {
      const dataWriter = new ArrayDataWriter();
      this._templateSerializer.writeTemplatedType(
        dataWriter,
        templateName,
        value
      );

      writer.writeInt32(dataWriter.position);
      writer.writeBytes(dataWriter.getBytesView());
    }
  }
}
