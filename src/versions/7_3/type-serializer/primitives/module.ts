import { ContainerModule, composeModules } from "microinject";

// TODO: use webpack require.context()

import { createModule as createArrayModule } from "./array/module";
import { createModule as createBooleanModule } from "./boolean/module";
import { createModule as createByteModule } from "./byte/module";
import { createModule as createColourModule } from "./colour/module";
import { createModule as createDictionaryModule } from "./dictionary/module";
import { createModule as createDoubleModule } from "./double/module";
import { createModule as createEnumerationModule } from "./enumeration/module";
import { createModule as createHashsetModule } from "./hashset/module";
import { createModule as createInt16Module } from "./int16/module";
import { createModule as createInt32Module } from "./int32/module";
import { createModule as createInt64Module } from "./int64/module";
import { createModule as createListModule } from "./list/module";
import { createModule as createPairModule } from "./pair/module";
import { createModule as createSByteModule } from "./sbyte/module";
import { createModule as createSingleModule } from "./single/module";
import { createModule as createStringModule } from "./string/module";
import { createModule as createUint16Module } from "./uint16/module";
import { createModule as createUint32Module } from "./uint32/module";
import { createModule as createUint64Module } from "./uint64/module";
import { createModule as createVector2Module } from "./vector2/module";
import { createModule as createVector2IModule } from "./vector2I/module";
import { createModule as createVector3Module } from "./vector3/module";

export function createModule() {
  return composeModules(
    createArrayModule(),
    createBooleanModule(),
    createByteModule(),
    createColourModule(),
    createDictionaryModule(),
    createDoubleModule(),
    createEnumerationModule(),
    createHashsetModule(),
    createInt16Module(),
    createInt32Module(),
    createInt64Module(),
    createListModule(),
    createPairModule(),
    createSByteModule(),
    createSingleModule(),
    createStringModule(),
    createUint16Module(),
    createUint32Module(),
    createUint64Module(),
    createVector2Module(),
    createVector2IModule(),
    createVector3Module()
  );
}
