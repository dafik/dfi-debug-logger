///<reference path="../node_modules/@types/node/index.d.ts"/>


var debug = [
    '*'
];
process.env.DEBUG = debug.join(',');

import DebugLogger = require("../debugLogger");
let x = new DebugLogger('ddd');


x.error('error');
x.debug('debug');
x.fatal('fatal');
x.info('info');
x.trace('trace');
x.warn('warn');
