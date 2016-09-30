///<reference path="../node_modules/@types/node/index.d.ts"/>
"use strict";
var debug = [
    '*'
];
process.env.DEBUG = debug.join(',');
const DebugLogger = require("../debugLogger");
let x = new DebugLogger('ddd');
x.error('error');
x.debug('debug');
x.fatal('fatal');
x.info('info');
x.trace('trace');
x.warn('warn');


process.exit();
//# sourceMappingURL=test.js.map