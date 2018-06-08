import { ContainerModule } from "microinject";

import { ArrayTypeSerializer } from "./serializer";

export function createModule() {
  return new ContainerModule(bind => {
    bind(ArrayTypeSerializer);
  });
}
