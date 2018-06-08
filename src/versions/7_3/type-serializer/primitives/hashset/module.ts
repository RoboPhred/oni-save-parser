import { ContainerModule } from "microinject";

import { HashSetTypeSerializer } from "./serializer";

export function createModule() {
  return new ContainerModule(bind => {
    bind(HashSetTypeSerializer);
  });
}
