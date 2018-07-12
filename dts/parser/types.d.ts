export interface ParserInstruction {
    type: string;
    isMeta?: boolean;
}
export declare function isMetaInstruction(inst: ParserInstruction): boolean;
