import {
    noParamsCmd,
    oneParamCmd,
    twoParamsCmd,
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

export const getCommandWithParams = (input) => {
    const commandWithParams = input.split(' ');

    let commandWithParamsObj = {};

    if (
        commandWithParams.length === 1 &&
        Object.keys(noParamsCmd).includes(commandWithParams[0])
    ) {
        commandWithParamsObj = {
            command: commandWithParams[0],
        };
    } else if (
        commandWithParams.length === 2 &&
        Object.keys(oneParamCmd).includes(commandWithParams[0])
    ) {
        commandWithParamsObj = {
            command: commandWithParams[0],
            param: commandWithParams[1],
        };
    } else if (
        commandWithParams.length === 3 &&
        Object.keys(twoParamsCmd).includes(commandWithParams[0])
    ) {
        commandWithParamsObj = {
            command: commandWithParams[0],
            param1: commandWithParams[1],
            param2: commandWithParams[2],
        };
    } else {
        throw new Error(errorMsg.invalidInput);
    }

    return commandWithParamsObj;
};
