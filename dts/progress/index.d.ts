import { ProgressInstruction } from "./types";
import { ParseInterceptor } from "../parser";
export declare function reportProgress(message: string): ProgressInstruction;
export declare function progressReporter(onProgress: (message: string) => void): ParseInterceptor;
