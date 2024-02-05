import path from 'path';
import * as zlib from 'zlib';
import { pipeline } from 'stream/promises';
import * as fs from 'fs';
import { normalizePath } from '../utils.js';

export const compress = async (
    currentDirectory,
    pathToFile,
    pathToDestination
) => {
    pathToFile = normalizePath(currentDirectory, pathToFile);
    pathToDestination = path.join(
        normalizePath(currentDirectory, pathToDestination),
        `${path.basename(pathToFile)}.gz`
    );

    const zip = zlib.createGzip();

    try {
        await pipeline(
            fs.createReadStream(pathToFile),
            zip,
            fs.createWriteStream(pathToDestination)
        );
    } catch (e) {
        throw e;
    }
};

export const decompress = async (
    currentDirectory,
    pathToFile,
    pathToDestination
) => {
    pathToFile = normalizePath(currentDirectory, pathToFile);
    const { name } = path.parse(path.basename(pathToFile));
    pathToDestination = path.join(
        normalizePath(currentDirectory, pathToDestination),
        name
    );

    const unzip = zlib.createGunzip();

    try {
        await pipeline(
            fs.createReadStream(pathToFile),
            unzip,
            fs.createWriteStream(pathToDestination)
        );
    } catch (e) {
        throw e;
    }
};
