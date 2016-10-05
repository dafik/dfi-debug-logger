import * as debug from "debug";

enum Colors  {
    debug = 6,
    error = 1,
    info = 2,
    warn = 3,
    trace = 4,
    fatal = 5,
    ssss = 333
}
class DebugLogger {
    name: string;
    private _loggers: Object;

    constructor(name: string) {
        this.name = name;
        this._loggers = {};
    }

    getLogger(type: string): debug.IDebugger {
        if (!this._loggers.hasOwnProperty(type)) {
            this._loggers[type] = debug(this.name + ':' + type);
            this._loggers[type].color = Colors[type];
        }
        return this._loggers[type];
    }

    trace(formatter: any, ...args: any[]): void {
        return this.getLogger('trace').apply(null, arguments);
    }

    debug(formatter: any, ...args: any[]): void {
        return this.getLogger('debug').apply(null, arguments);
    }

    info(formatter: any, ...args: any[]): void {
        return this.getLogger('info').apply(null, arguments);
    }

    warn(formatter: any, ...args: any[]): void {
        return this.getLogger('warn').apply(null, arguments);
    }

    error(formatter: any, ...args: any[]): void {
        return this.getLogger('error').apply(null, arguments);
    }

    fatal(formatter: any, ...args: any[]): void {
        return this.getLogger('fatal').apply(null, arguments);
    }

    isTraceEnabled(): boolean {
        return this.getLogger('trace').enabled;
    }

    isDebugEnabled(): boolean {
        return this.getLogger('debug').enabled;
    }

    isInfoEnabled(): boolean {
        return this.getLogger('info').enabled;
    }

    isWarnEnabled(): boolean {
        return this.getLogger('warn').enabled;
    }

    isErrorEnabled(): boolean {
        return this.getLogger('error').enabled;
    }

    isFatalEnabled(): boolean {
        return this.getLogger('fatal').enabled;
    }

}
export = DebugLogger