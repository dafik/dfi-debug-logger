"use strict";
const assert = require("assert");
const DebugLogger = require("../debugLogger");
describe("object", () => {
    function onLoggerDisabled(done) {
        let loggerName = "testLogger";
        let logger = new DebugLogger(loggerName);
        assert.equal(logger.name, loggerName);
        assert.equal(logger.isTraceEnabled(), false);
        assert.equal(logger.isDebugEnabled(), false);
        assert.equal(logger.isInfoEnabled(), false);
        assert.equal(logger.isWarnEnabled(), false);
        assert.equal(logger.isErrorEnabled(), false);
        assert.equal(logger.isFatalEnabled(), false);
        done();
    }
    function onLoggerEnabled(done) {
        let loggerName = "testLogger";
        process.env.DEBUG = loggerName + "*";
        let path = process.cwd() + "/node_modules/debug/debug.js";
        delete require.cache[require.resolve("debug")];
        delete require.cache[path];
        delete require.cache[require.resolve("../debugLogger")];
        let debugLogger1 = require("../debugLogger");
        let logger = new debugLogger1(loggerName);
        assert.equal(logger.name, loggerName);
        assert.equal(logger.isTraceEnabled(), true);
        assert.equal(logger.isDebugEnabled(), true);
        assert.equal(logger.isInfoEnabled(), true);
        assert.equal(logger.isWarnEnabled(), true);
        assert.equal(logger.isErrorEnabled(), true);
        assert.equal(logger.isFatalEnabled(), true);
        done();
    }
    function onLoggerTest(done) {
        function logFn(message) {
            assert.ok(message.match(loggerMessage) !== null);
            done();
        }
        let loggerName = "testLogger";
        let loggerMessage = "testMessage";
        process.env.DEBUG = loggerName + "*";
        let path = process.cwd() + "/node_modules/debug/debug.js";
        delete require.cache[require.resolve("debug")];
        delete require.cache[path];
        delete require.cache[require.resolve("../debugLogger")];
        let debugLogger1 = require("../debugLogger");
        let logger = new debugLogger1(loggerName);
        logger.getLogger("error").log = logFn;
        logger.error(loggerMessage);
    }
    it("logger disabled", onLoggerDisabled);
    it("logger enabled", onLoggerEnabled);
    it("logger test", onLoggerTest);
});
//# sourceMappingURL=001-logger.js.map