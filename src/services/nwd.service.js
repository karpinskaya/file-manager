import * as path from 'path';
import * as fs from 'fs';
import * as fs_promises from 'fs/promises';
import { isFile, getAbsolutePath } from '../helpers.js';

export const up = (currDir) => {
    return path.dirname(currDir);
}

export const cd = (currDir, filePath) => {
    let path = getAbsolutePath(currDir, filePath);

    if (fs.existsSync(path)) {
        return path;
    }
    else {
        throw new Error();
    }
};

export const ls = async (currDir) => {
    try {
        const files = await fs_promises.readdir(currDir);
        const res = [];
        
        files.forEach((value, index, array) => {
            res.push({ Name: value, Type: isFile(path.join(currDir, value)) });
        });

        console.table(res.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0))
                         .sort((a,b) => (a.Type > b.Type) ? 1 : ((b.Type > a.Type) ? -1 : 0)));
    }
    catch (err) {
        throw err;
    }
};