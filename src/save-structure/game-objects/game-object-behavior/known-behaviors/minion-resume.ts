import { MinionRoleGroup } from "../../../const-data/roles/role-group";

import { GameObjectBehavior } from "../game-object-behavior";

import { BehaviorName } from "./types";

export const MinionResumeBehavior: BehaviorName<MinionResumeBehavior> =
  "MinionResume";
export interface MinionResumeBehavior extends GameObjectBehavior {
  name: "MinionResume";
  templateData: {
    ExperienceByRoleID?: [string, number][];
    MasteryByRoleID?: [string, boolean][];
    AptitudeByRoleGroup?: [MinionRoleGroup, number][];

    currentRole?: string;
    targetRole?: string;
  };
}
