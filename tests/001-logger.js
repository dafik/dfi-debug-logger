"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const debugLogger_1 = require("../debugLogger");
describe("object", () => {
    process.env.DEBUG_HIDE_DATE = true;
    process.env.DEBUG_STDOUT = true;
    process.env.DEBUG_ALIGN = true;
    /**
     * Removes a module from the cache
     */
    function purgeCache(moduleName) {
        // Traverse the cache looking for the files
        // loaded by the specified module name
        searchCache(moduleName, (mod) => {
            delete require.cache[mod.id];
        });
        // Remove cached paths to the module.
        // Thanks to @bentael for pointing this out.
        Object.keys(module.constructor._pathCache).forEach((cacheKey) => {
            if (cacheKey.indexOf(moduleName) > 0) {
                delete module.constructor._pathCache[cacheKey];
            }
        });
    }
    /**
     * Traverses the cache to search for all the cached
     * files of the specified module name
     */
    function searchCache(moduleName, callback) {
        // Resolve the module identified by the specified name
        const moduleResolved = require.resolve(moduleName);
        // Check if the module has been resolved and found within
        // the cache
        if (moduleResolved) {
            const module = require.cache[moduleResolved];
            if (module !== undefined) {
                // Recursively go over the results
                const traverse = (mod) => {
                    // Go over each of the module's children and
                    // traverse them
                    mod.children.forEach((child) => {
                        traverse(child);
                    });
                    // Call the specified callback providing the
                    // found cached module
                    callback(mod);
                };
                traverse(module);
            }
        }
    }
    const onLoggerDisabled = (done) => {
        const loggerName = "testLogger";
        const logger = new debugLogger_1.default(loggerName);
        assert.equal(logger.name, loggerName);
        assert.equal(logger.isTraceEnabled(), false);
        assert.equal(logger.isDebugEnabled(), false);
        assert.equal(logger.isInfoEnabled(), false);
        assert.equal(logger.isWarnEnabled(), false);
        assert.equal(logger.isErrorEnabled(), false);
        assert.equal(logger.isFatalEnabled(), false);
        done();
    };
    const onLoggerEnabled = (done) => {
        const loggerName = "testLogger";
        purgeCache("../debugLogger");
        process.env.DEBUG = loggerName + "*";
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
    const onLoggerTest = (done) => {
        function logFn(message) {
            assert.ok(message.match(loggerMessage) !== null);
            done();
        }
        const loggerName = "testLogger";
        const loggerMessage = "testMessage";
        process.env.DEBUG = loggerName + "*";
        purgeCache("../debugLogger");
        const debugLogger1 = require("../debugLogger").default;
        const logger = new debugLogger1(loggerName);
        logger.getLogger(debugLogger_1.default.levels.ERROR).log = logFn;
        logger.error(loggerMessage);
    };
    it("logger disabled", onLoggerDisabled);
    it("logger enabled", onLoggerEnabled);
    it("logger test", onLoggerTest);
    it("logger test all", (done) => {
        const loggerName = "testLogger";
        const loggerMessage = "testMessage";
        process.env.DEBUG = loggerName + "*";
        purgeCache("../debugLogger");
        const debugLogger1 = require("../debugLogger").default;
        const logger = new debugLogger1(loggerName);
        logger[debugLogger_1.default.levels.TRACE](loggerMessage);
        logger[debugLogger_1.default.levels.DEBUG](loggerMessage);
        logger[debugLogger_1.default.levels.INFO](loggerMessage);
        logger[debugLogger_1.default.levels.WARN](loggerMessage);
        logger[debugLogger_1.default.levels.ERROR](loggerMessage);
        logger[debugLogger_1.default.levels.FATAL](loggerMessage);
        done();
    });
    it("logger test tab ", (done) => {
        purgeCache("../debugLogger");
        process.env.DEBUG = "a*";
        const debugLogger1 = require("../debugLogger").default;
        const logger = new debugLogger1("abcabcabc");
        const logger1 = new debugLogger1("a");
        logger.info("test");
        logger1.info("test");
        done();
    });
    it("logger test map ", (done) => {
        process.env.DEBUG_STDOUT = false;
        purgeCache("../debugLogger");
        process.env.DEBUG = "a*";
        const debugLogger1 = require("../debugLogger").default;
        const logger = new debugLogger1("abcabcabc");
        const logger1 = new debugLogger1("a");
        logger.info("test");
        logger1.info("test");
        done();
    });
});
//# sourceMappingURL=001-logger.js.map