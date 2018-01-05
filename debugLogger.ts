import * as debug from "debug";

const log = ((typeof process === "undefined") ? require("./browser") : require("./node")).default;
// const log = require("./browser")
// TODO walk around for browser require

const mapToStdOut = typeof process !== "undefined" && typeof process.env.DEBUG_STDOUT !== "undefined" ? !!process.env.DEBUG_STDOUT : false;
const align = typeof process !== "undefined" && typeof process.env.DEBUG_ALIGN !== "undefined" ? !!process.env.DEBUG_ALIGN : false;

let maxLength: number = 0;

const enum Colors {
    debug = 6,
    error = 1,
    info = 2,
    warn = 3,
    trace = 4,
    fatal = 5
}

export default class DebugLogger {

    static get levels(): IDfiDebugLoggerLevels {
        return LOG_LEVELS;
    }

    get name(): string {
        return this._name;
    }

    private _name: string;
    private _loggers: { [key: string]: debug.IDebugger };

    constructor(name: string) {
        this._loggers = {};
        this._name = name;
    }

    public getLogger(type: string, color?: number): debug.IDebugger {
        if (!this._loggers.hasOwnProperty(type)) {
            const namespace = this.name + ":" + type;

            this._loggers[type] = debug(namespace);
            if (color) {
                this._loggers[type].color = color;
            }
            if (mapToStdOut) {
                if (!align) {
                    this._loggers[type].log = log;
                } else {
                    maxLength = maxLength > namespace.length ? maxLength : namespace.length;
                    this._loggers[type].log = (...args: any[]) => {
                        if (namespace.length < maxLength) {
                            args[0] = args[0].replace(namespace, namespace + Array(maxLength - namespace.length + 1).join(" "));
                        }
                        log.apply(null, args);
                    };
                }
            } else if (align) {
                maxLength = maxLength > namespace.length ? maxLength : namespace.length;
                this._loggers[type].log = (...args: any[]) => {
                    if (namespace.length < maxLength) {
                        args[0] = args[0].replace(namespace, namespace + Array(maxLength - namespace.length + 1).join(" "));
                    }
                    log.apply(null, args);
                };
            }
        }
        return this._loggers[type];
    }

    public trace(formatter: any, ...args: any[]): void {
        return this.getLogger(DebugLogger.levels.TRACE, Colors.trace).apply(null, arguments);
    }

    public debug(formatter: any, ...args: any[]): void {
        return this.getLogger(DebugLogger.levels.DEBUG, Colors.debug).apply(null, arguments);
    }

    public info(formatter: any, ...args: any[]): void {
        return this.getLogger(DebugLogger.levels.INFO, Colors.info).apply(null, arguments);
    }

    public warn(formatter: any, ...args: any[]): void {
        return this.getLogger(DebugLogger.levels.WARN, Colors.warn).apply(null, arguments);
    }

    public error(formatter: any, ...args: any[]): void {
        return this.getLogger(DebugLogger.levels.ERROR, Colors.error).apply(null, arguments);
    }

    public fatal(formatter: any, ...args: any[]): void {
        return this.getLogger(DebugLogger.levels.FATAL, Colors.fatal).apply(null, arguments);
    }

    public isTraceEnabled(): boolean {
        return this.getLogger(DebugLogger.levels.TRACE).enabled;
    }

    public isDebugEnabled(): boolean {
        return this.getLogger(DebugLogger.levels.DEBUG).enabled;
    }

    public isInfoEnabled(): boolean {
        return this.getLogger(DebugLogger.levels.INFO).enabled;
    }

    public isWarnEnabled(): boolean {
        return this.getLogger(DebugLogger.levels.WARN).enabled;
    }

    public isErrorEnabled(): boolean {
        return this.getLogger(DebugLogger.levels.ERROR).enabled;
    }

    public isFatalEnabled(): boolean {
        return this.getLogger(DebugLogger.levels.FATAL).enabled;
    }
}

export interface IDfiDebugLoggerLevels {
    TRACE: string;
    DEBUG: string;
    INFO: string;
    WARN: string;
    ERROR: string;
    FATAL: string;
}

const LOG_LEVELS: IDfiDebugLoggerLevels = {
    DEBUG: "debug",
    ERROR: "error",
    FATAL: "fatal",
    INFO: "info",
    TRACE: "trace",
    WARN: "warn"
};
