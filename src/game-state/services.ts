
import {
    Identifier
} from "microinject";

import {
    Parseable
} from "../interfaces";

export interface OniGameState extends Parseable {

}
export const OniGameState: Identifier<OniGameState> = Symbol("OniGameState");