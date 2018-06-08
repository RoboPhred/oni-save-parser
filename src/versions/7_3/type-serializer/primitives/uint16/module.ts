import { ContainerModule } from "microinject";

import { UInt16TypeSerializer } from "./serializer";

export function createModule() {
  return new ContainerModule(bind => {
    bind(UInt16TypeSerializer);
  });
}
