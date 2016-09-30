import * as debug from "debug";
declare class DebugLogger {
    name: string;
    private _loggers;
    constructor(name: string);
    getLogger(type: string): debug.IDebugger;
    trace(formatter: any, ...args: any[]): void;
    debug(formatter: any, ...args: any[]): void;
    info(formatter: any, ...args: any[]): void;
    warn(formatter: any, ...args: any[]): void;
    error(formatter: any, ...args: any[]): void;
    fatal(formatter: any, ...args: any[]): void;
}
export = DebugLogger;
