import path from 'path';
import { access, readdir } from 'fs/promises';
import * as fs from 'fs';
import { normalizePath } from '../utils.js';

export const up = (pathToDirectory) => {
    return path.dirname(pathToDirectory);
};

export const cd = async (currentPath, targetPath) => {
    const newPath = normalizePath(currentPath, targetPath);

    try {
        await access(newPath);
        return newPath;
    } catch (e) {
        throw e;
    }
};

export const ls = async (currentPath) => {
    try {
        const files = await readdir(currentPath);
        const res = [];

        files.forEach((file) => {
            res.push({
                Name: file,
                Type: isFile(path.join(currentPath, file)),
            });
        });

        console.table(
            res
                .sort((a, b) =>
                    a.Name > b.Name ? 1 : b.Name > a.Name ? -1 : 0
                )
                .sort((a, b) =>
                    a.Type > b.Type ? 1 : b.Type > a.Type ? -1 : 0
                )
        );
    } catch (e) {
        throw e;
    }
};

export const isFile = (currentPath) => {
    return fs.lstatSync(currentPath).isFile() ? 'file' : 'directory';
};
