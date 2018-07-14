import { ParseIterator, UnparseIterator } from "../parser";

import { taggedParseStart, taggedParseEnd } from "./instructions";

export interface ParseFunctionOne<T1, R> {
  (arg1: T1): ParseIterator<R>;
}
export interface ParseFunctionTwo<T1, T2, R> {
  (arg1: T1, arg2: T2): ParseIterator<R>;
}
export interface ParseFunctionMany<R> {
  (...args: any[]): ParseIterator<R>;
}

export interface UnparseFunctionOne<T1> {
  (arg1: T1): UnparseIterator;
}
export interface UnparseFunctionTwo<T1, T2> {
  (arg1: T1, arg2: T2): UnparseIterator;
}
export interface UnparseFunctionMany {
  (...args: any[]): UnparseIterator;
}

// export default function taggedParser<R>(
//   tag: string | ((...args: any[]) => string),
//   parser: ParseFunctionMany<R>
// ): ParseFunctionMany<R>;
// export default function taggedParser<R>(
//   tag: string | ((...args: any[]) => string),
//   instanceName: string | ((...args: any[]) => string),
//   parser: ParseFunctionMany<R>
// ): ParseFunctionMany<R>;

export default function taggedParser<T1, R>(
  tag: string | ((arg1: T1) => string),
  parser: ParseFunctionOne<T1, R>
): ParseFunctionOne<T1, R>;
export default function taggedParser<T1, R>(
  tag: string | ((arg1: T1) => string),
  instanceName: string | ((...args: any[]) => string),
  parser: ParseFunctionOne<T1, R>
): ParseFunctionOne<T1, R>;

export default function taggedParser<T1, T2, R>(
  tag: string | ((arg1: T1, arg2: T2) => string),
  parser: ParseFunctionTwo<T1, T2, R>
): ParseFunctionTwo<T1, T2, R>;
export default function taggedParser<T1, T2, R>(
  tag: string | ((arg1: T1, arg2: T2) => string),
  instanceName: string | ((...args: any[]) => string),
  parser: ParseFunctionTwo<T1, T2, R>
): ParseFunctionTwo<T1, T2, R>;

// export default function taggedParser(
//   tag: string | ((...args: any[]) => string),
//   parser: UnparseFunctionMany
// ): UnparseFunctionMany;
// export default function taggedParser(
//   tag: string | ((...args: any[]) => string),
//   instanceName: string | ((...args: any[]) => string),
//   parser: UnparseFunctionMany
// ): UnparseFunctionMany;

export default function taggedParser<T1>(
  tag: string | ((arg1: T1) => string),
  parser: UnparseFunctionOne<T1>
): UnparseFunctionOne<T1>;
export default function taggedParser<T1>(
  tag: string | ((arg1: T1) => string),
  instanceName: string | ((...args: any[]) => string),
  parser: UnparseFunctionOne<T1>
): UnparseFunctionOne<T1>;

export default function taggedParser<T1, T2>(
  tag: string | ((arg1: T1, arg2: T2) => string),
  parser: UnparseFunctionTwo<T1, T2>
): UnparseFunctionTwo<T1, T2>;
export default function taggedParser<T1, T2>(
  tag: string | ((arg1: T1, arg2: T2) => string),
  instanceName: string | ((...args: any[]) => string),
  parser: UnparseFunctionTwo<T1, T2>
): UnparseFunctionTwo<T1, T2>;

export default function taggedParser<R>(
  tag: string | ((...args: any[]) => string),
  arg1:
    | (string | ((...args: any[]) => string))
    | (ParseFunctionMany<R> | UnparseFunctionMany),
  arg2?: ParseFunctionMany<R> | UnparseFunctionMany
): ParseFunctionMany<R> | UnparseFunctionMany {
  let instanceName: string | ((...args: any[]) => string) | undefined;
  let parser: ParseFunctionMany<R> | UnparseFunctionMany;

  if (arguments.length === 2) {
    parser = arg1 as any;
  } else {
    instanceName = arg1 as any;
    parser = arg2!;
  }

  return function*(...args: any[]) {
    const resolvedTag = typeof tag === "function" ? tag(...args) : tag;
    const resolvedInstance =
      instanceName && typeof instanceName === "function"
        ? instanceName(...args)
        : instanceName;
    yield taggedParseStart(resolvedTag, resolvedInstance);
    const result = yield* parser(...args);
    yield taggedParseEnd(resolvedTag, resolvedInstance);
    return result;
  };
}
