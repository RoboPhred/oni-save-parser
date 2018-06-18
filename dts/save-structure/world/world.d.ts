export interface SaveGameWorld {
    WidthInCells: number;
    HeightInCells: number;
    streamed: [string, Uint8Array][];
}
