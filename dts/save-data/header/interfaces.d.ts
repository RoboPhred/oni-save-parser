export interface OniSaveHeader {
    readonly buildVersion: number;
    readonly headerVersion: number;
    readonly isCompressed: boolean;
    readonly gameData: object;
}
