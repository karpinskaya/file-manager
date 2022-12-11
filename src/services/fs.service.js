import * as path from 'path';
import * as fs from 'fs';
import * as fs_promises from 'fs/promises';
import { pipeline } from 'stream/promises';
import { getAbsolutePath } from '../helpers.js';

export const cat = async (currDir, filePath) => {
    return await new Promise((resolve, reject) => {
        const fPath = path.join(currDir, filePath);
        let readStream = fs.createReadStream(fPath);
        let fileContent = '';

        readStream.on('data', (chunk) => {
            fileContent += chunk;
            resolve(fileContent);
        });

        readStream.on('error', (err) => {
            reject(err);
        });
    });
};

export const add = async (currDir, fileName) => {
    const filePath = path.join(currDir, fileName);

    try {
        await fs_promises.writeFile(filePath, '');
    }
    catch (err) {
        throw err;
    }
};

export const rn = async (currDir, oldFileName, newFileName) => {
    const oldFilePath = path.join(currDir, oldFileName);
    const newFilePath = path.join(currDir, newFileName);

    try {
        await fs_promises.rename(oldFilePath, newFilePath);
    }
    catch (err) {
        throw err;
    }
};

export const cp = async (currDir, srcFile, dstPath) => {
    const srcFilePath = getAbsolutePath(currDir, srcFile);
    let dstFilePath = getAbsolutePath(currDir, dstPath);

    dstFilePath = path.join(dstFilePath, path.basename(srcFilePath));

    if (fs.existsSync(srcFilePath)) {
        await pipeline(fs.createReadStream(srcFilePath), fs.createWriteStream(dstFilePath));
    }
    else {
        throw new Error();
    }
};

export const mv = async (currDir, srcFile, dstPath) => {
    try {
        await cp(currDir, srcFile, dstPath);
        await rm(currDir, srcFile);
    }
    catch (err) {
        throw err;
    }
};

export const rm = async (currDir, filePath) => {
    let path = getAbsolutePath(currDir, filePath);

    try {
        await fs_promises.rm(path);
    }
    catch (err) {
        throw err;
    }
};