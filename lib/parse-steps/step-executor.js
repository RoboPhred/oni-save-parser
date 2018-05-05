"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const services_1 = require("./services");
let ParseStepExecutorImpl = class ParseStepExecutorImpl {
    constructor(_listeners) {
        this._listeners = _listeners;
        this._tokenStack = [];
    }
    do(name, action) {
        const token = this._begin(name);
        try {
            return action();
        }
        finally {
            token.end();
        }
    }
    for(name, count, action) {
        const token = this._begin(name, count);
        try {
            const items = new Array(count);
            for (let i = 0; i < count; i++) {
                if (i !== 0)
                    token.next();
                items[i] = action(i);
            }
            return items;
        }
        finally {
            token.end();
        }
    }
    forEach(name, items, action) {
        const token = this._begin(name, items.length);
        try {
            const results = new Array(items.length);
            for (let i = 0; i < items.length; i++) {
                if (i !== 0)
                    token.next();
                results[i] = action(items[i]);
            }
            return results;
        }
        finally {
            token.end();
        }
    }
    _begin(name, max) {
        const token = {
            name,
            max,
            current: 1,
            next: null,
            end: null
        };
        token.next = this._next.bind(this, token),
            token.end = this._end.bind(this, token);
        this._tokenStack.push(token);
        this._announceStart(token);
        return token;
    }
    _next(token) {
        token.current++;
        this._announceProgress(token);
    }
    _end(token) {
        const index = this._tokenStack.indexOf(token);
        if (index === -1) {
            // Odd, but do not raise an error.
            return;
        }
        this._tokenStack.splice(index, 1);
        this._announceEnd(token);
    }
    _announceStart(token) {
        this._listeners.forEach(listener => {
            if (listener.onStart == null)
                return;
            listener.onStart({
                name: token.name,
                current: token.current,
                max: token.max
            });
        });
    }
    _announceProgress(token) {
        this._listeners.forEach(listener => {
            if (listener.onProgress == null)
                return;
            listener.onProgress({
                name: token.name,
                current: token.current,
                max: token.max
            });
        });
    }
    _announceEnd(token) {
        this._listeners.forEach(listener => {
            if (listener.onEnd == null)
                return;
            listener.onEnd({
                name: token.name,
                current: token.current,
                max: token.max
            });
        });
    }
};
ParseStepExecutorImpl = __decorate([
    microinject_1.injectable(services_1.ParseStepExecutor),
    microinject_1.singleton(),
    __param(0, microinject_1.optional()), __param(0, microinject_1.inject(services_1.ParseStepListener, { all: true }))
], ParseStepExecutorImpl);
exports.ParseStepExecutorImpl = ParseStepExecutorImpl;
//# sourceMappingURL=step-executor.js.map