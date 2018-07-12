import { ParserInstruction } from "../parser/types";
export interface ProgressInstruction extends ParserInstruction {
    type: "progress";
    isMeta: true;
    message: string;
}
