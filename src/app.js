import * as readline from 'readline';
import { getUsername, getHomedir, printWelcomeMsg, printGoodbyeMsg, printCurrDir, printMsg, isExistingCommand } from './helpers.js';
import { INVALID_INPUT_MSG, OPERATION_FAILED_MSG, COMMANDS_WITHOUT_PARAMS, COMMANDS_WITH_PARAMS, OS_PARAMS } from './constants.js';
import { up, cd, ls } from './services/nwd.service.js';
import { cat, add, rn, cp, mv, rm } from './services/fs.service.js';
import { osFunc } from './services/os.service.js';
import { hash } from './services/crypto.service.js';
import { compress, decompress } from './services/zlib.service.js';

const username = getUsername();

let currDir = getHomedir();

printWelcomeMsg(username);
printCurrDir(currDir);

const app = async () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.on('line', async (input) => {
        let [command, ...params] = input.split(' ');
        params = params.join(' ');
    
        if (command === '.exit') {
            rl.close();
            return;
        }
    
        try {
            if (isExistingCommand(COMMANDS_WITHOUT_PARAMS, command) && params.length === 0 || isExistingCommand(COMMANDS_WITH_PARAMS, command) && command !== COMMANDS_WITH_PARAMS.os && params.length > 0 || command === COMMANDS_WITH_PARAMS.os && isExistingCommand(OS_PARAMS, params)) {
                if (command === COMMANDS_WITHOUT_PARAMS.up) {
                    currDir = up(currDir);
                }
                else if (command === COMMANDS_WITH_PARAMS.cd) {
                    currDir = cd(currDir, params);
                }
                else if (command === COMMANDS_WITHOUT_PARAMS.ls) {
                    await ls(currDir);
                }
                else if (command === COMMANDS_WITH_PARAMS.cat) {
                    console.log(await cat(currDir, params));
                }
                else if (command === COMMANDS_WITH_PARAMS.add) {
                    await add(currDir, params);
                }
                else if (command === COMMANDS_WITH_PARAMS.rn) {
                    await rn(currDir, params.split(' ')[0], params.split(' ')[1]);
                }
                else if (command === COMMANDS_WITH_PARAMS.cp) {
                    await cp(currDir, params.split(' ')[0], params.split(' ')[1]);
                }
                else if (command === COMMANDS_WITH_PARAMS.mv) {
                    await mv(currDir, params.split(' ')[0], params.split(' ')[1]);
                }
                else if (command === COMMANDS_WITH_PARAMS.rm) {
                    await rm(currDir, params);
                }
                else if (command === COMMANDS_WITH_PARAMS.os) {
                    osFunc(params);
                }
                else if (command === COMMANDS_WITH_PARAMS.hash) {
                    await hash(currDir, params);
                }
                else if (command === COMMANDS_WITH_PARAMS.compress) {
                    await compress(currDir, params.split(' ')[0], params.split(' ')[1]);
                }
                else if (command === COMMANDS_WITH_PARAMS.decompress) {
                    await decompress(currDir, params.split(' ')[0], params.split(' ')[1]);
                }
            }
            else {
                printMsg(INVALID_INPUT_MSG);
            }
        }
        catch (err) {
            printMsg(OPERATION_FAILED_MSG);
        }
    
        printCurrDir(currDir);
    });

    rl.on('close', () => {
        printGoodbyeMsg(username);
    });
}

export default app;