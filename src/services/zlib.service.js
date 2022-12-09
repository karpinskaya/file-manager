import * as path from 'path';
import * as fs from 'fs';
import { pipeline } from 'stream/promises';
import * as zlib from 'zlib';
import { getAbsolutePath } from '../helpers.js';

export const compress = async (currDir, srcFile, dstPath) => {
    const srcFilePath = getAbsolutePath(currDir, srcFile);
    let dstFilePath = getAbsolutePath(currDir, dstPath);
    const zip = zlib.createGzip();

    dstFilePath = path.join(dstFilePath, `compressed_${path.basename(srcFilePath)}`);

    if (fs.existsSync(srcFilePath)) {
        await pipeline(fs.createReadStream(srcFilePath), zip, fs.createWriteStream(dstFilePath));
    }
    else {
        throw new Error();
    }
};

export const decompress = async (currDir, srcFile, dstPath) => {
    const srcFilePath = getAbsolutePath(currDir, srcFile);
    let dstFilePath = getAbsolutePath(currDir, dstPath);
    const unzip = zlib.createGunzip();

    dstFilePath = path.join(dstFilePath, `decompressed_${path.basename(srcFilePath)}`);

    if (fs.existsSync(srcFilePath)) {
        await pipeline(fs.createReadStream(srcFilePath), unzip, fs.createWriteStream(dstFilePath));
    }
    else {
        throw new Error();
    }
};