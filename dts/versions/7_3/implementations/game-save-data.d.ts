import { Vector2I } from "../../../interfaces";
import { DataReader, DataWriter } from "../../../binary-serializer";
import { TypeTemplateSerializer } from "../type-serializer";
import { GameSaveDataInstance } from "../services";
export declare class GameSaveDataInstanceImpl implements GameSaveDataInstance {
    private _templateSerializer;
    private _data;
    constructor(_templateSerializer: TypeTemplateSerializer);
    readonly gasConduitFlow: any;
    readonly liquidConduitFlow: any;
    readonly simActiveRegionMin: Vector2I;
    readonly simActiveRegionMax: Vector2I;
    readonly fallingWater: any;
    readonly unstableGround: any;
    readonly worldDetail: any;
    readonly customGameSettings: any;
    readonly debugWasUsed: boolean;
    readonly autoPrioritizeRoles: any;
    readonly advancedPersonalPriorities: boolean;
    parse(reader: DataReader): void;
    write(writer: DataWriter): void;
    fromJSON(value: any): void;
    toJSON(): {
        gasConduitFlow: any;
        liquidConduitFlow: any;
        simActiveRegionMin: Vector2I;
        simActiveRegionMax: Vector2I;
        fallingWater: any;
        unstableGround: any;
        worldDetail: any;
        customGameSettings: any;
        debugWasUsed: boolean;
        autoPrioritizeRoles: any;
        advancedPersonalPriorities: boolean;
    };
}
