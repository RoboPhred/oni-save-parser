import { validateDotNetIdentifierName } from "../../../../../utils";

import {
  ParseIterator,
  readInt32,
  UnparseIterator,
  readKleiString,
  getReaderPosition,
  writeInt32,
  writeKleiString,
  writeDataLengthBegin,
  writeDataLengthEnd
} from "../../../../../parser";

import {
  TemplateParser,
  TemplateUnparser
} from "../../../../type-templates/template-data-parser";

import {
  ModifiersExtraData,
  AmountInstance,
  DiseaseInstance,
  ModificationInstance
} from "./modifiers";

export function* parseModifiersExtraData(
  templateParser: TemplateParser
): ParseIterator<ModifiersExtraData> {
  const amounts: AmountInstance[] = yield* parseModifiers<AmountInstance>(
    "Klei.AI.AmountInstance",
    templateParser
  );
  const diseases: DiseaseInstance[] = yield* parseModifiers<DiseaseInstance>(
    "Klei.AI.DiseaseInstance",
    templateParser
  );

  const extraData: ModifiersExtraData = {
    amounts,
    diseases
  };
  return extraData;
}

export function* unparseModifiersExtraData(
  extraData: ModifiersExtraData,
  templateUnparser: TemplateUnparser
): UnparseIterator {
  yield* unparseModifiers<AmountInstance>(
    extraData.amounts,
    "Klei.AI.AmountInstance",
    templateUnparser
  );
  yield* unparseModifiers<DiseaseInstance>(
    extraData.diseases,
    "Klei.AI.DiseaseInstance",
    templateUnparser
  );
}

function* parseModifiers<T extends ModificationInstance>(
  modifierInstanceType: string,
  templateParser: TemplateParser
): ParseIterator<T[]> {
  const count = yield readInt32();
  const items = new Array(count);
  for (let i = 0; i < count; i++) {
    const modifier = yield* parseModifier<T>(
      modifierInstanceType,
      templateParser
    );
    items[i] = modifier;
  }
  return items;
}

function* unparseModifiers<T extends ModificationInstance>(
  instances: T[],
  modifierInstanceType: string,
  templateUnparser: TemplateUnparser
): UnparseIterator {
  yield writeInt32(instances.length);
  for (const instance of instances) {
    yield* unparseModifier<T>(instance, modifierInstanceType, templateUnparser);
  }
}

function* parseModifier<T extends ModificationInstance>(
  modifierInstanceType: string,
  templateParser: TemplateParser
): ParseIterator<T> {
  const name = yield readKleiString();
  validateDotNetIdentifierName(name);
  const dataLength = yield readInt32();

  const startPos = yield getReaderPosition();
  const value = yield* templateParser.parseByTemplate(modifierInstanceType);
  const endPos = yield getReaderPosition();

  const dataRemaining = dataLength - (endPos - startPos);
  if (dataRemaining !== 0) {
    throw new Error(
      `Modifier "${name}" deserialized ${Math.abs(dataRemaining)} ${
        dataRemaining > 0 ? "less" : "more"
      } bytes type data than expected.`
    );
  }

  const instance: ModificationInstance = {
    name,
    value
  };

  return instance as T;
}

function* unparseModifier<T extends ModificationInstance>(
  instance: T,
  modifierInstanceType: string,
  templateUnparser: TemplateUnparser
) {
  yield writeKleiString(instance.name);

  const token = yield writeDataLengthBegin();
  yield* templateUnparser.unparseByTemplate(
    modifierInstanceType,
    instance.value
  );
  yield writeDataLengthEnd(token);
}
