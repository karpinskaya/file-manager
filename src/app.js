import * as readline from 'readline/promises';
import {
    printHelloMsg,
    printGoodbyeMsg,
    printErrorMsg,
    printCurrDir,
    getCommandWithParams,
} from './utils.js';
import {
    noParamsCmd,
    oneParamCmd,
    twoParamsCmd,
    errorMsg,
} from './constants.js';

const app = async () => {
    const username =
        process.argv[process.argv.length - 1]?.split('=')[1] || 'Username';

    let currDir = process.cwd();

    printHelloMsg(username);
    printCurrDir(currDir);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.on('line', async (input) => {
        try {
            const commandWithParamsObj = getCommandWithParams(input);

            try {
                //
            } catch {
                // throw new Error(operationFailedMsg);
            }
        } catch (e) {
            printErrorMsg(e.message);
        }

        printCurrDir(currDir);
    });

    rl.on('close', () => {
        printGoodbyeMsg(username);
    });
};

export default app;
