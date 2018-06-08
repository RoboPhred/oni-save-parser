import { ContainerModule } from "microinject";

import { ColourTypeSerializer } from "./serializer";

export function createModule() {
  return new ContainerModule(bind => {
    bind(ColourTypeSerializer);
  });
}
