import * as fs_promises from 'fs/promises';
import { createHmac } from 'crypto';
import { getAbsolutePath } from '../helpers.js';

export const hash = async (currDir, filePath) => {
    let path = getAbsolutePath(currDir, filePath);

    try {
        const fileContent = await fs_promises.readFile(path, { encoding: 'utf-8' });
        const hash = createHmac('sha256', fileContent).digest('hex');

        console.log(hash);
    }
    catch (err) {
        throw err;
    }
};