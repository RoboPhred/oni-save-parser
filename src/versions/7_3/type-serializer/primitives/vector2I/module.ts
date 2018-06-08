import { ContainerModule } from "microinject";

import { Vector2ITypeSerializer } from "./serializer";

export function createModule() {
  return new ContainerModule(bind => {
    bind(Vector2ITypeSerializer);
  });
}
