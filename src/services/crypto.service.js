import { readFile } from 'fs/promises';
import { createHash } from 'crypto';
import { normalizePath } from '../utils.js';

export const hash = async (currentDirectory, filePath) => {
    try {
        filePath = normalizePath(currentDirectory, filePath);
        const data = await readFile(filePath);
        console.log(createHash('sha256').update(data).digest('hex'));
    } catch (e) {
        throw e;
    }
};
