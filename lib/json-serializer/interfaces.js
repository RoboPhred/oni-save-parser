"use strict";
// This used to work, but now typescript is insistant that we cannot ever
//  widen an interface to a general "all values of specific type" case.
/*
export type JsonPrimitive = string | number | boolean | null;
export type JsonObject = {
    [key: string]: JsonType | undefined;
};
export type JsonType = JsonPrimitive | JsonPrimitive[] | JsonObject;
*/
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=interfaces.js.map