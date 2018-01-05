"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
const log = (...args) => {
    process.stdout.write(util.format.apply(util, args) + "\n");
};
exports.default = log;
//# sourceMappingURL=node.js.map