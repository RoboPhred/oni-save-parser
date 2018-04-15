import { GameObjectBehavior } from "../interfaces";
import { BehaviorName } from "./interfaces";

export const MinionResumeBehavior: BehaviorName<MinionResumeBehavior> = "MinionResume";
export interface MinionResumeBehavior extends GameObjectBehavior {
    name: "MinionResume";
    parsedData: {
        ExperienceByRoleID: Map<string, number>;
        MasteryByRoleID: Map<string, boolean>;
        AptitudeByRoleGroup: Map<{hash: number}, number>;

        currentRole: string;
        targetRole: string;
    };
}
