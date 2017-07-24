"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
class DebugLogger {
    get name() {
        return this._name;
    }
    constructor(name) {
        this._loggers = {};
        this._name = name;
    }
    getLogger(type, color) {
        if (!this._loggers.hasOwnProperty(type)) {
            this._loggers[type] = debug(this.name + ":" + type);
            if (color) {
                this._loggers[type].color = color;
            }
        }
        return this._loggers[type];
    }
    trace(formatter, ...args) {
        return this.getLogger("trace", 4 /* trace */).apply(null, arguments);
    }
    debug(formatter, ...args) {
        return this.getLogger("debug", 6 /* debug */).apply(null, arguments);
    }
    info(formatter, ...args) {
        return this.getLogger("info", 2 /* info */).apply(null, arguments);
    }
    warn(formatter, ...args) {
        return this.getLogger("warn", 3 /* warn */).apply(null, arguments);
    }
    error(formatter, ...args) {
        return this.getLogger("error", 1 /* error */).apply(null, arguments);
    }
    fatal(formatter, ...args) {
        return this.getLogger("fatal", 5 /* fatal */).apply(null, arguments);
    }
    isTraceEnabled() {
        return this.getLogger("trace").enabled;
    }
    isDebugEnabled() {
        return this.getLogger("debug").enabled;
    }
    isInfoEnabled() {
        return this.getLogger("info").enabled;
    }
    isWarnEnabled() {
        return this.getLogger("warn").enabled;
    }
    isErrorEnabled() {
        return this.getLogger("error").enabled;
    }
    isFatalEnabled() {
        return this.getLogger("fatal").enabled;
    }
}
exports.default = DebugLogger;
//# sourceMappingURL=debugLogger.js.map