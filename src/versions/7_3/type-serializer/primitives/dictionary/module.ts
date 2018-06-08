import { ContainerModule } from "microinject";

import { DictionaryTypeSerializer } from "./serializer";

export function createModule() {
  return new ContainerModule(bind => {
    bind(DictionaryTypeSerializer);
  });
}
