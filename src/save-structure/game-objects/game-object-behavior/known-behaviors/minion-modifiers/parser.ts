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
  MinionModifiersExtraData,
  AIAmountInstance,
  AISicknessInstance,
  MinionModificationInstance
} from "./minion-modifiers";

export function* parseMinionModifiersExtraData(
  templateParser: TemplateParser
): ParseIterator<MinionModifiersExtraData> {
  const amounts: AIAmountInstance[] = yield* parseModifiers<AIAmountInstance>(
    "Klei.AI.AmountInstance",
    templateParser
  );
  const sicknesses: AISicknessInstance[] = yield* parseModifiers<
    AISicknessInstance
  >("Klei.AI.SicknessInstance", templateParser);

  const extraData: MinionModifiersExtraData = {
    amounts,
    sicknesses
  };
  return extraData;
}

export function* unparseMinionModifiersExtraData(
  extraData: MinionModifiersExtraData,
  templateUnparser: TemplateUnparser
): UnparseIterator {
  yield* unparseModifiers<AIAmountInstance>(
    extraData.amounts,
    "Klei.AI.AmountInstance",
    templateUnparser
  );
  yield* unparseModifiers<AISicknessInstance>(
    extraData.sicknesses,
    "Klei.AI.SicknessInstance",
    templateUnparser
  );
}

function* parseModifiers<T extends MinionModificationInstance>(
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

function* unparseModifiers<T extends MinionModificationInstance>(
  instances: T[],
  modifierInstanceType: string,
  templateUnparser: TemplateUnparser
): UnparseIterator {
  yield writeInt32(instances.length);
  for (const instance of instances) {
    yield* unparseModifier<T>(instance, modifierInstanceType, templateUnparser);
  }
}

function* parseModifier<T extends MinionModificationInstance>(
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

  const instance: MinionModificationInstance = {
    name,
    value
  };

  return instance as T;
}

function* unparseModifier<T extends MinionModificationInstance>(
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
