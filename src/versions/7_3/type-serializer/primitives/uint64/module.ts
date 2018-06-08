import { ContainerModule } from "microinject";

import { UInt64TypeSerializer } from "./serializer";

export function createModule() {
  return new ContainerModule(bind => {
    bind(UInt64TypeSerializer);
  });
}
