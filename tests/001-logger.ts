import assert = require("assert");
import DebugLogger from "../debugLogger";

describe("object", () => {

    const onLoggerDisabled: (this: Mocha.ITestCallbackContext, done: MochaDone) => any = (done) => {
        const loggerName = "testLogger";
        const logger = new DebugLogger(loggerName);

        assert.equal(logger.name, loggerName);

        assert.equal(logger.isTraceEnabled(), false);
        assert.equal(logger.isDebugEnabled(), false);
        assert.equal(logger.isInfoEnabled(), false);
        assert.equal(logger.isWarnEnabled(), false);
        assert.equal(logger.isErrorEnabled(), false);
        assert.equal(logger.isFatalEnabled(), false);

        done();
    };

    const onLoggerEnabled: (this: Mocha.ITestCallbackContext, done: MochaDone) => any = (done) => {
        const loggerName = "testLogger";

        process.env.DEBUG = loggerName + "*";

        const path = process.cwd() + "/node_modules/debug/debug.js";

        delete require.cache[require.resolve("debug")];
        delete require.cache[path];
        delete require.cache[require.resolve("../debugLogger")];

        const debugLogger1 = require("../debugLogger").default;

        const logger = new debugLogger1(loggerName);

        assert.equal(logger.name, loggerName);

        assert.equal(logger.isTraceEnabled(), true);
        assert.equal(logger.isDebugEnabled(), true);
        assert.equal(logger.isInfoEnabled(), true);
        assert.equal(logger.isWarnEnabled(), true);
        assert.equal(logger.isErrorEnabled(), true);
        assert.equal(logger.isFatalEnabled(), true);

        done();
    };

    const onLoggerTest: (this: Mocha.ITestCallbackContext, done: MochaDone) => any = (done) => {
        function logFn(message: string) {
            assert.ok(message.match(loggerMessage) !== null);
            done();
        }

        const loggerName = "testLogger";
        const loggerMessage = "testMessage";

        process.env.DEBUG = loggerName + "*";

        const path = process.cwd() + "/node_modules/debug/debug.js";

        delete require.cache[require.resolve("debug")];
        delete require.cache[path];
        delete require.cache[require.resolve("../debugLogger")];

        const debugLogger1 = require("../debugLogger").default;

        const logger = new debugLogger1(loggerName);
        logger.getLogger("error").log = logFn;

        logger.error(loggerMessage);
    };

    it("logger disabled", onLoggerDisabled);
    it("logger enabled", onLoggerEnabled);
    it("logger test", onLoggerTest);

});
