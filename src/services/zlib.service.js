import * as path from 'path';
import * as fs from 'fs';
import { pipeline } from 'stream/promises';
import * as zlib from 'zlib';
import { getAbsolutePath } from '../helpers.js';

export const compress = async (currDir, srcFile, dstPath) => {
    const srcFilePath = getAbsolutePath(currDir, srcFile);
    const dstFilePath = getAbsolutePath(dstPath, `compressed_${path.basename(srcFilePath)}`);
    const zip = zlib.createGzip();

    if (fs.existsSync(srcFilePath)) {
        await pipeline(fs.createReadStream(srcFilePath), zip, fs.createWriteStream(dstFilePath));
    }
    else {
        throw new Error();
    }
};

export const decompress = async (currDir, srcFile, dstPath) => {
    const srcFilePath = getAbsolutePath(currDir, srcFile);
    const dstFilePath = getAbsolutePath(dstPath, `decompressed_${path.basename(srcFilePath)}`);
    const unzip = zlib.createGunzip();

    if (fs.existsSync(srcFilePath)) {
        await pipeline(fs.createReadStream(srcFilePath), unzip, fs.createWriteStream(dstFilePath));
    }
    else {
        throw new Error();
    }
};