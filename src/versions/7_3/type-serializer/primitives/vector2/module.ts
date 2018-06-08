import { ContainerModule } from "microinject";

import { Vector2TypeSerializer } from "./serializer";

export function createModule() {
  return new ContainerModule(bind => {
    bind(Vector2TypeSerializer);
  });
}
