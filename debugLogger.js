"use strict";
const debug = require("debug");
var Colors;
(function (Colors) {
    Colors[Colors["debug"] = 6] = "debug";
    Colors[Colors["error"] = 1] = "error";
    Colors[Colors["info"] = 2] = "info";
    Colors[Colors["warn"] = 3] = "warn";
    Colors[Colors["trace"] = 4] = "trace";
    Colors[Colors["fatal"] = 5] = "fatal";
    Colors[Colors["ssss"] = 333] = "ssss";
})(Colors || (Colors = {}));
class DebugLogger {
    constructor(name) {
        this._loggers = {};
        this._name = name;
    }
    get name() {
        return this._name;
    }
    getLogger(type) {
        if (!this._loggers.hasOwnProperty(type)) {
            this._loggers[type] = debug(this.name + ":" + type);
            this._loggers[type].color = Colors[type];
        }
        return this._loggers[type];
    }
    trace(formatter, ...args) {
        return this.getLogger("trace").apply(null, arguments);
    }
    debug(formatter, ...args) {
        return this.getLogger("debug").apply(null, arguments);
    }
    info(formatter, ...args) {
        return this.getLogger("info").apply(null, arguments);
    }
    warn(formatter, ...args) {
        return this.getLogger("warn").apply(null, arguments);
    }
    error(formatter, ...args) {
        return this.getLogger("error").apply(null, arguments);
    }
    fatal(formatter, ...args) {
        return this.getLogger("fatal").apply(null, arguments);
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
module.exports = DebugLogger;
//# sourceMappingURL=debugLogger.js.map