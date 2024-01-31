import * as readline from 'readline/promises';
import {
    printHelloMsg,
    printGoodbyeMsg,
    printErrorMsg,
    printCurrDir,
    validateInput,
} from './utils.js';
import { allCommands, errorMsg } from './constants.js';
import * as nwdService from './services/nwd.service.js';

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
            if (input === '.exit') {
                rl.close();
                return;
            }

            const cmdObj = validateInput(currDir, input);

            try {
                switch (cmdObj.command) {
                    case allCommands.up:
                        currDir = nwdService.up(currDir);
                        break;
                    case allCommands.cd:
                        currDir = await nwdService.cd(
                            currDir,
                            cmdObj.params[0]
                        );
                        break;
                    case allCommands.ls:
                        await nwdService.ls(currDir);
                        break;
                    case allCommands.cat:
                        //
                        break;
                    case allCommands.add:
                        //
                        break;
                    case allCommands.rn:
                        //
                        break;
                    case allCommands.cp:
                        //
                        break;
                    case allCommands.mv:
                        //
                        break;
                    case allCommands.rm:
                        //
                        break;
                    case allCommands.os:
                        //
                        break;
                    case allCommands.hash:
                        //
                        break;
                    case allCommands.compress:
                        //
                        break;
                    case allCommands.decompress:
                        //
                        break;
                }
            } catch {
                throw new Error(errorMsg.operationFailed);
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
