import { createReadStream, createWriteStream } from 'fs';
import { writeFile, rename, rm as remove } from 'fs/promises';
import path from 'path';
import { pipeline } from 'stream/promises';
import { normalizePath } from '../utils.js';

export const cat = async (currentPath, targetPath) => {
    const filePath = normalizePath(currentPath, targetPath);
    const readable = createReadStream(filePath);

    readable.setEncoding('utf8');

    return new Promise((resolve, reject) => {
        let content = '';

        readable.on('data', (chunk) => (content += chunk));
        readable.on('end', () => resolve(content));
        // readable.on('error', (err) => reject(err));
    });
};

export const add = async (currentPath, fileName) => {
    try {
        await writeFile(path.join(currentPath, fileName), '', { flag: 'wx' });
    } catch (e) {
        throw e;
    }
};

export const rn = async (currentPath, targetPath, newFileName) => {
    try {
        const oldPathToFile = normalizePath(currentPath, targetPath);
        const newPathToFile = path.join(
            path.dirname(oldPathToFile),
            newFileName
        );
        await rename(oldPathToFile, newPathToFile);
    } catch (e) {
        throw e;
    }
};

export const cp = async (currentPath, pathToFile, pathToNewDirectory) => {
    try {
        pathToFile = normalizePath(currentPath, pathToFile);
        pathToNewDirectory = normalizePath(currentPath, pathToNewDirectory);

        const fileName = path.basename(pathToFile);
        const pathToNewFile = path.join(pathToNewDirectory, fileName);

        await add(pathToNewDirectory, fileName);

        await pipeline(
            createReadStream(pathToFile),
            createWriteStream(pathToNewFile)
        );
    } catch (e) {
        throw e;
    }
};

export const mv = async (currentPath, pathToFile, pathToNewDirectory) => {
    try {
        await cp(currentPath, pathToFile, pathToNewDirectory);
        await rm(currentPath, pathToFile);
    } catch (e) {
        throw e;
    }
};

export const rm = async (currentPath, pathToFile) => {
    try {
        pathToFile = normalizePath(currentPath, pathToFile);
        await remove(pathToFile);
    } catch (e) {
        throw e;
    }
};
