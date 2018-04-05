
// Typedefs for this is broken
declare module "text-encoding" {
    export class TextDecoder {
        constructor(encoding: string);
        decode(view: ArrayBufferView);
    }

    export class TextEncoder {
        constructor(encoding: string);
        encode(view: ArrayBufferView);
    }
}
