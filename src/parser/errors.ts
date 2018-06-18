export class ParseError extends Error {
  dataOffset: number;
  cause?: () => Error;

  constructor(message: string, dataOffset: number) {
    super(message);
    Object.setPrototypeOf(this, ParseError);
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
      return err;
    }

    return new ParseError(String(error), dataOffset);
  }
}
