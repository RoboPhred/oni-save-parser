import { ContainerModule } from "microinject";

import { BooleanTypeSerializer } from "./serializer";

export function createModule() {
  return new ContainerModule(bind => {
    bind(BooleanTypeSerializer);
  });
}
