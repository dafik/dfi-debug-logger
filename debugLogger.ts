import * as debug from "debug";

const enum Colors {
    debug = 6,
    error = 1,
    info = 2,
    warn = 3,
    trace = 4,
    fatal = 5
}

export default class DebugLogger {
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
            this._loggers[type] = debug(this.name + ":" + type);
            if (color) {
                this._loggers[type].color = color;
            }
        }
        return this._loggers[type];
    }

    public trace(formatter: any, ...args: any[]): void {
        return this.getLogger("trace", Colors.trace).apply(null, arguments);
    }

    public debug(formatter: any, ...args: any[]): void {
        return this.getLogger("debug", Colors.debug).apply(null, arguments);
    }

    public info(formatter: any, ...args: any[]): void {
        return this.getLogger("info", Colors.info).apply(null, arguments);
    }

    public warn(formatter: any, ...args: any[]): void {
        return this.getLogger("warn", Colors.warn).apply(null, arguments);
    }

    public error(formatter: any, ...args: any[]): void {
        return this.getLogger("error", Colors.error).apply(null, arguments);
    }

    public fatal(formatter: any, ...args: any[]): void {
        return this.getLogger("fatal", Colors.fatal).apply(null, arguments);
    }

    public isTraceEnabled(): boolean {
        return this.getLogger("trace").enabled;
    }

    public isDebugEnabled(): boolean {
        return this.getLogger("debug").enabled;
    }

    public isInfoEnabled(): boolean {
        return this.getLogger("info").enabled;
    }

    public isWarnEnabled(): boolean {
        return this.getLogger("warn").enabled;
    }

    public isErrorEnabled(): boolean {
        return this.getLogger("error").enabled;
    }

    public isFatalEnabled(): boolean {
        return this.getLogger("fatal").enabled;
    }
}
