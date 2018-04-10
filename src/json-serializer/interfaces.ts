
// This used to work, but now typescript is insistant that we cannot ever
//  widen an interface to a general "all values of specific type" case.
/*
export type JsonPrimitive = string | number | boolean | null;
export type JsonObject = {
    [key: string]: JsonType | undefined;
};
export type JsonType = JsonPrimitive | JsonPrimitive[] | JsonObject;
*/

// This is painful...
export type JsonType = any;


export interface JsonParseable<T extends JsonType = JsonType> {
    fromJSON(value: T): void;
}

export interface JsonWritable<T extends JsonType = JsonType> {
    toJSON(): T;
}

export type JsonSerializable<T extends JsonType = JsonType> = JsonParseable<T> & JsonWritable<T>;
