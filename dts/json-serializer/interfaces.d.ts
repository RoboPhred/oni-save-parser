export declare type JsonType = any;
export interface JsonParseable<T extends JsonType = JsonType> {
    fromJSON(value: T): void;
}
export interface JsonWritable<T extends JsonType = JsonType> {
    toJSON(): T;
}
export declare type JsonSerializable<T extends JsonType = JsonType> = JsonParseable<T> & JsonWritable<T>;
