import { ContainerModule } from "microinject";

import { DoubleTypeSerializer } from "./serializer";

export function createModule() {
  return new ContainerModule(bind => {
    bind(DoubleTypeSerializer);
  });
}
