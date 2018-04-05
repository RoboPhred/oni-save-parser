
import {
    injectable,
    singleton
} from "microinject";

import {
    Logger
} from "./services";


@injectable(Logger)
@singleton()
export class LoggerImpl implements Logger {
    trace(str: string): void {
        console.log(str);
    }
}