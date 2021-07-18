export class ParseError extends Error {
  dataOffset: number;
  cause?: () => Error;
  code?: string | number;

  constructor(message: string, dataOffset: number) {
    super(message);
    Object.setPrototypeOf(this, ParseError.prototype);
    this.dataOffset = dataOffset;
  }

  static create(error: any, dataOffset: number): ParseError {
    if (error instanceof ParseError) {
      return error;
    }

    if (typeof error.message === "string") {
      const err = new ParseError(
        `Error while processing content: ${error.message}`,
        dataOffset
      );

      err.cause = () => error;
      err.stack = error.stack;

      if (error.code) {
        err.code = error.code;
      }

      return err;
    }

    const err = new ParseError(String(error), dataOffset);
    Error.captureStackTrace(err, ParseError.create);
    return err;
  }
}
