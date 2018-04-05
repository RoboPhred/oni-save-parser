export interface SaveFileRoot {
    WidthInCells: number;
    HeightInCells: number;
    streamed: Map<string, ArrayBufferView>;
}
