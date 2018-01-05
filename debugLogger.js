"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
const log = ((typeof process === "undefined") ? require("./browser") : require("./node")).default;
// const log = require("./browser")
// TODO walk around for browser require
const mapToStdOut = typeof process !== "undefined" && typeof process.env.DEBUG_STDOUT !== "undefined" ? !!process.env.DEBUG_STDOUT : false;
const align = typeof process !== "undefined" && typeof process.env.DEBUG_ALIGN !== "undefined" ? !!process.env.DEBUG_ALIGN : false;
let maxLength = 0;
class DebugLogger {
    static get levels() {
        return LOG_LEVELS;
    }
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
                        log.apply(null, args);
                    };
                }
            }
            else if (align) {
                maxLength = maxLength > namespace.length ? maxLength : namespace.length;
                this._loggers[type].log = (...args) => {
                    if (namespace.length < maxLength) {
                        args[0] = args[0].replace(namespace, namespace + Array(maxLength - namespace.length + 1).join(" "));
                    }
                    log.apply(null, args);
                };
            }
        }
        return this._loggers[type];
    }
    trace(formatter, ...args) {
        return this.getLogger(DebugLogger.levels.TRACE, 4 /* trace */).apply(null, arguments);
    }
    debug(formatter, ...args) {
        return this.getLogger(DebugLogger.levels.DEBUG, 6 /* debug */).apply(null, arguments);
    }
    info(formatter, ...args) {
        return this.getLogger(DebugLogger.levels.INFO, 2 /* info */).apply(null, arguments);
    }
    warn(formatter, ...args) {
        return this.getLogger(DebugLogger.levels.WARN, 3 /* warn */).apply(null, arguments);
    }
    error(formatter, ...args) {
        return this.getLogger(DebugLogger.levels.ERROR, 1 /* error */).apply(null, arguments);
    }
    fatal(formatter, ...args) {
        return this.getLogger(DebugLogger.levels.FATAL, 5 /* fatal */).apply(null, arguments);
    }
    isTraceEnabled() {
        return this.getLogger(DebugLogger.levels.TRACE).enabled;
    }
    isDebugEnabled() {
        return this.getLogger(DebugLogger.levels.DEBUG).enabled;
    }
    isInfoEnabled() {
        return this.getLogger(DebugLogger.levels.INFO).enabled;
    }
    isWarnEnabled() {
        return this.getLogger(DebugLogger.levels.WARN).enabled;
    }
    isErrorEnabled() {
        return this.getLogger(DebugLogger.levels.ERROR).enabled;
    }
    isFatalEnabled() {
        return this.getLogger(DebugLogger.levels.FATAL).enabled;
    }
}
exports.default = DebugLogger;
const LOG_LEVELS = {
    DEBUG: "debug",
    ERROR: "error",
    FATAL: "fatal",
    INFO: "info",
    TRACE: "trace",
    WARN: "warn"
};
//# sourceMappingURL=debugLogger.js.map