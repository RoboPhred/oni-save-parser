import { ContainerModule } from "microinject";

import { Int32TypeSerializer } from "./serializer";

export function createModule() {
  return new ContainerModule(bind => {
    bind(Int32TypeSerializer);
  });
}
