import * as util from "util";

const log = (...args: any[]) => {
    process.stdout.write(util.format.apply(util, args) + "\n");
};
export default log;
