import { existsSync } from 'fs';
import path from 'path';
import {
    noParamsCmd,
    oneParamCmd,
    twoParamsCmd,
    osParams,
    allCommands,
    errorMsg,
} from './constants.js';

export const printHelloMsg = (username) => {
    console.log(`Welcome to the File Manager, ${username}!`);
};

export const printGoodbyeMsg = (username) => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
};

export const printErrorMsg = (errorMsg) => {
    console.log(errorMsg);
};

export const printCurrDir = (currDir) => {
    console.log(`You are currently in ${currDir}`);
};

export const validateInput = (currDir, input) => {
    const [command, ...params] = input.split(' ');
    let isValidInput = false;

    if (noParamsCmd.includes(command) && params.length === 0) {
        isValidInput = true;
    }

    if (oneParamCmd.includes(command) && params.length === 1) {
        if (
            (command === allCommands.os &&
                Object.values(osParams).includes(params[0])) ||
            command === allCommands.add
        ) {
            isValidInput = true;
        } else {
            const normalizedPath = normalizePath(currDir, params[0]);
            isValidInput = existsSync(normalizedPath);
        }
    }

    if (twoParamsCmd.includes(command) && params.length === 2) {
        const normalizedPath1 = normalizePath(currDir, params[0]);
        const normalizedPath2 = normalizePath(currDir, params[1]);
        if (
            (command === allCommands.rn && existsSync(normalizedPath1)) ||
            (existsSync(normalizedPath1) && existsSync(normalizedPath2))
        ) {
            isValidInput = true;
        }
    }

    if (!isValidInput) {
        throw new Error(errorMsg.invalidInput);
    } else {
        return { command, params };
    }
};

export const normalizePath = (currentPath, targetPath) => {
    const normalizedPath = path.isAbsolute(targetPath)
        ? targetPath
        : path.resolve(currentPath, targetPath);
    return normalizedPath;
};
