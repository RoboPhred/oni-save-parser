import { Vector3, Quaternion } from "../data-types";

export interface GameObjectGroup {
  name: string;
  gameObjects: GameObjectCollection;
}

export type GameObjectCollection = GameObject[];

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
  // TODO: Figure out the madness of indexing inside ONI SaveLoadRoot.LoadInternal
  readonly behaviors: GameObjectBehavior[];
}

export interface GameObjectBehavior {
  /**
   * The assembly type name of the behavior.
   */
  name: string;

  /**
   * The parsed template data, if templateRecognized is true.
   * A null value indicates a correctly parsed null instance.
   * If no template match was found, this property will be unset.
   */
  templateData?: any | null;

  /**
   * If this behavior contains extra data known to the parser,
   * this will contain the parsed data.
   * A null value may represent a succesfully parsed null value.
   * If no data is available or understood, this property will be unset.
   */
  extraData?: any | null;

  /**
   * If extra data is known to exist but not understood,
   * this will contain an ArrayBuffer of the unparsed extra data.
   * If the extra data was parsed or not present, this
   * property will be unset.
   */
  extraRaw?: ArrayBuffer;
}
