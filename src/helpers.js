import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';

export const getUsername = () => {
    return process.argv[2]?.split('=')[1] ? process.argv[2].split('=')[1] : 'User';
};

export const getHomedir = () => {
    return os.homedir();
};

export const printWelcomeMsg = (username) => {
    console.log(`Welcome to the File Manager, ${username}!`);
};

export const printGoodbyeMsg = (username) => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
};

export const printCurrDir = (currDir) => {
    console.log(`You are currently in ${currDir}`);
};

export const printMsg = (msg) => {
    console.log(msg);
};

export const isExistingCommand = (commandsSet, command) => {
    return Object.values(commandsSet).includes(command);
};

export const isFile = (currDir) => {
    return fs.lstatSync(currDir).isFile() ? 'file' : 'directory';
};

export const getAbsolutePath = (currDir, filePath) => {
    return path.isAbsolute(filePath) ? filePath : path.resolve(currDir, filePath);
};