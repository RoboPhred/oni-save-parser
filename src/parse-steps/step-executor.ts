
import {
    injectable,
    inject,
    optional,
    singleton
} from "microinject";

import {
    ParseStepExecutor,
    ParseStepListener
} from "./services";


interface ParseStepToken {
    readonly name: string;
    current: number;
    readonly max?: number;
    next(count?: number): void;
    end(): void;
}


@injectable(ParseStepExecutor)
@singleton()
export class ParseStepExecutorImpl implements ParseStepExecutor {
    
    private readonly _tokenStack: ParseStepToken[] = [];

    constructor(
        @optional() @inject(ParseStepListener, {all: true})
        private _listeners: ParseStepListener[]
    ) { }

    do<T>(name: string, action: () => T): T {
        const token = this._begin(name);
        try {
            return action();
        }
        finally {
            token.end();
        }
    }

    for<T>(name: string, count: number, action: (index: number) => T): T[] {
        const token = this._begin(name, count);
        try {
            const items: T[] = new Array(count);
            for (let i = 0; i < count; i++) {
                if (i !== 0) token.next();
                items[i] = action(i);
            }
            return items;
        }
        finally {
            token.end();
        }
    }

    forEach<T, R>(name: string, items: T[], action: (item: T) => R): R[] {
        const token = this._begin(name, items.length);
        try {
            const results: R[] = new Array(items.length);
            for (let i = 0; i < items.length; i++) {
                if (i !== 0) token.next();
                results[i] = action(items[i]);
            }
            return results;
        }
        finally {
            token.end();
        }
    }

    private _begin(name: string, max?: number | undefined): ParseStepToken {
        const token: ParseStepToken = {
            name,
            max,
            current: 1,
            next: null as any,
            end: null as any
        };
        token.next = this._next.bind(this, token),
        token.end = this._end.bind(this, token)
        this._tokenStack.push(token);
        this._announceStart(token);
        return token;
    }

    private _next(token: ParseStepToken) {
        token.current++;
        this._announceProgress(token);
    }

    private _end(token: ParseStepToken) {
        const index = this._tokenStack.indexOf(token);
        if (index === -1) {
            // Odd, but do not raise an error.
            return;
        }

        this._tokenStack.splice(index, 1);
        this._announceEnd(token);
    }

    private _announceStart(token: ParseStepToken) {
        this._listeners.forEach(listener => {
            if (listener.onStart == null) return;

            listener.onStart({
                name: token.name,
                current: token.current,
                max: token.max
            });
        });
    }

    private _announceProgress(token: ParseStepToken) {
        this._listeners.forEach(listener => {
            if (listener.onProgress == null) return;
            
            listener.onProgress({
                name: token.name,
                current: token.current,
                max: token.max
            });
        });
    }

    private _announceEnd(token: ParseStepToken) {
        this._listeners.forEach(listener => {
            if (listener.onEnd == null) return;
            
            listener.onEnd({
                name: token.name,
                current: token.current,
                max: token.max
            });
        });
    }
}
