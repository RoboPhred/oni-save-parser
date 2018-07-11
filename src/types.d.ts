declare type ArrayValues<T> = T extends (infer U)[] ? U : never;
