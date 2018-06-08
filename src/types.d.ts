type Mutable<T> = { -readonly [P in keyof T]: T[P] };

// Typedefs for this is broken
declare module "text-encoding" {
  export class TextDecoder {
    constructor(encoding: string);
    decode(view: ArrayBufferView): string;
  }

  export class TextEncoder {
    constructor(encoding: string);
    encode(view: string): Uint8Array;
  }
}
