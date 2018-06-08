import { ContainerModule } from "microinject";

import { EnumerationTypeSerializer } from "./serializer";

export function createModule() {
  return new ContainerModule(bind => {
    bind(EnumerationTypeSerializer);
  });
}
