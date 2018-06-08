import { ContainerModule, composeModules } from "microinject";

import { createModule as createPrimitivesModule } from "./primitives/module";
import { createModule as createUserDefinedModule } from "./user-defined/module";

import { TypeSerializerImpl } from "./type-serializer";
import { TypeTemplateRegistryImpl } from "./template-registry";

export function createModule() {
  return composeModules(
    createPrimitivesModule(),
    createUserDefinedModule(),
    new ContainerModule(bind => {
      bind(TypeSerializerImpl);
      bind(TypeTemplateRegistryImpl);
    })
  );
}
