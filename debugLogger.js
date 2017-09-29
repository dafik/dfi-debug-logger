"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
const util = require("util");
const mapToStdOut = typeof process.env.DEBUG_STDOUT !== "undefined" ? !!process.env.DEBUG_STDOUT : false;
const align = typeof process.env.DEBUG_ALIGN !== "undefined" ? !!process.env.DEBUG_ALIGN : false;
let maxLength = 0;
const log = (...args) => {
    if (typeof process === "undefined") {
        console.log.apply(args);
    }
    else {
        process.stdout.write(util.format.apply(util, args) + "\n");
    }
};
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
            const namespace = this.name + ":" + type;
            this._loggers[type] = debug(namespace);
            if (color) {
                this._loggers[type].color = color;
            }
            if (mapToStdOut) {
                if (!align) {
                    this._loggers[type].log = log;
                }
                else {
                    maxLength = maxLength > namespace.length ? maxLength : namespace.length;
                    this._loggers[type].log = (...args) => {
                        if (namespace.length < maxLength) {
                            args[0] = args[0].replace(namespace, namespace + Array(maxLength - namespace.length + 1).join(" "));
                        }
                        log(args);
                    };
                }
            }
            else if (align) {
                maxLength = maxLength > namespace.length ? maxLength : namespace.length;
                this._loggers[type].log = log;
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