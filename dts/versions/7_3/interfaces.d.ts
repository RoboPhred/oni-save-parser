import { Vector2I, Vector3, Quaternion } from "../../interfaces";
/**
 * Holds all data that makes up an Oxygen Not Included save game.
 *
 * This object has no class analogue, as it represents data
 * held in a mix of static fields and unity engine state.
 *
 * Class: none
 * Parser: "SaveLoader.Load(string filename)"
 *
 * Parse Instructions:
 * ```
 * header = parse SaveGameHeader
 * templateCount = parse Int32
 * for each templateCount do
 *  templateNameLength = parse Int32
 *  templateName = parse Byte[templateNameLength] as string(utf-8)
 *  template = parse TypeTemplate
 *  template.name = templateName
 *  add template to templates
 * end
 * body = parse SaveBody
 * ```
 */
export interface SaveGame {
    /**
     * The save file header.
     * This contains data shown to the user when
     * browsing the "Load Game" menu.
     *
     * Parser: "SaveGame.GetHeader(IReader reader, out SaveGame.Header header)"
     */
    header: SaveGameHeader;
    /**
     * The type templates contained in this save.
     * Type templates describe the serialization contract
     * for various named non-primitive assembly types.
     *
     * Parser Namespace: "KSerialization"
     * Parser Class: "Manager"
     * Parser Function: "DeserializeDirectory(IReader reader)"
     */
    /**
     * The body content of the save file.
     *
     * This has no equivalent object form in the save file.
     * It's data is read directly by the parser and sent to
     * the rest of the game engine.
     */
    body: SaveBody;
}
/**
 * Class: "SaveGame+Header"
 * Parser: "SaveGame.GetHeader(IReader reader, out SaveGame.Header header)"
 */
export interface SaveGameHeader {
    buildVersion: number;
    headerVersion: number;
    isCompressed: boolean;
    gameInfo: SaveGameInfo;
}
/**
 * Class: "SaveGame+GameInfo"
 * Parser: "SaveGame.GetGameInfo(byte[] bytes)"
 */
export interface SaveGameInfo {
    numberOfCycles: number;
    numberOfDuplicants: number;
    baseName: string;
    isAutoSave: boolean;
    originalSaveName: string;
    saveMajorVersion: number;
    saveMinorVersion: number;
}
/**
 * The body content of the save file.
 *
 * This has no equivalent object form in the save file.
 * It's data is read directly by the parser and sent to
 * the rest of the game engine.
 */
export interface SaveBody {
    saveRoot: GameSaveRoot;
    gameSettings: GameSettings;
    gameObjects: GameObjectPrefabs;
    gameData: GameSaveData;
}
/**
 * An object containing arrays of game objects keyed
 * by their prefab assembly types.
 */
export interface GameObjectPrefabs {
    [key: string]: GameObject[];
}
/**
 * Namespace: "Klei"
 * Class: "SaveFileRoot"
 */
export interface GameSaveRoot {
    /**
     * The width of the map in cells.
     *
     * Class Property: "WidthInCells"
     */
    widthInCells: number;
    /**
     * The height of the map in cells.
     *
     * Class Property: "HidthInCells"
     */
    heightInCells: number;
    /**
     * Binary blob data stored by key in the save file.
     *
     * Class Property: "streamed"
     */
    streamed: {
        [key: string]: Uint8Array;
    };
}
export interface GameSettings {
    baseAlreadyCreated: boolean;
    nextUniqueID: number;
    gameID: number;
}
export interface GameObject {
    readonly position: Vector3;
    readonly rotation: Quaternion;
    readonly scale: Vector3;
    /**
     * Number from 0 to 255.
     * This is used to look up the object's unity prefab.
     */
    readonly folder: number;
    /**
     * Behaviors for this game object.
     * The order may matter to ONI; needs more investigation.
     */
    readonly behaviors: GameObjectBehavior[];
}
export interface GameObjectBehavior {
    /**
     * The assembly type name of the behavior.
     */
    name: string;
    /**
     * Whether we recognized the assembly type name from a type template.
     * If true, parsedData represents a parsed type template, even if the value is null.
     * If false, parsedData will not be supplied, and all behavior data will be stored
     * in extraData.
     */
    templateRecognized: boolean;
    /**
     * The parsed template data, if templateRecognized is true.
     * A null value may indicate a correctly parsed null instance.
     */
    parsedData?: any | null;
    /**
     * If templateRecognized is true, this may contain all extranious
     * data remaining after parsing the template.  This usually occurs
     * on types that implement ISaveLoadableDetails.
     * If no extranious data remained, this may be null or undefined.
     *
     * If templateRecognized is false, this contains all of the behavior's
     * data.
     */
    extraData?: ArrayBuffer | null;
}
/**
 * Class: "Game+GameSaveData"
 */
export interface GameSaveData {
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
}
