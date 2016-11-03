import * as debug from "debug";

class DebugLogger {
    public readonly name: string;

    constructor(name: string);

    public getLogger(type: string): debug.IDebugger;

    public trace(formatter: any, ...args: any[]): void;

    public debug(formatter: any, ...args: any[]): void;

    public info(formatter: any, ...args: any[]): void;

    public warn(formatter: any, ...args: any[]): void;

    public error(formatter: any, ...args: any[]): void;

    public fatal(formatter: any, ...args: any[]): void;

    public isTraceEnabled(): boolean;

    public isDebugEnabled(): boolean;

    public isInfoEnabled(): boolean;

    public isWarnEnabled(): boolean;

    public isErrorEnabled(): boolean;

    public isFatalEnabled(): boolean;
}

declare module "local-dfi-debug-logger" {

    export = DebugLogger;
}
