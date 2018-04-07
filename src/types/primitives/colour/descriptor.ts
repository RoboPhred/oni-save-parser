
import {
    TypeDescriptor
} from "../../interfaces";

import {
    Colour
} from "./interfaces";

export interface ColourTypeDescriptor extends TypeDescriptor<Colour>{
    name: "colour";
}
