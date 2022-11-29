import * as os from 'os';
import * as readline from 'readline';
import * as path from 'path';
import * as fs from 'fs';
import * as fs_promises from 'fs/promises';

let username = process.argv[2]?.split('=')[1] ? process.argv[2].split('=')[1] : 'User';
let currDir = os.homedir();

let invalidInputMsg = 'Invalid input';
let operationFailedMsg = 'Operation failed';

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${currDir}`);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', async (input) => {

    if (input === '.exit') {
        rl.close();
        return;
    }

    try {
        if (input === 'up') {
            currDir = path.dirname(currDir);
        }
        else if (input.substring(0, 2) === 'cd') {
            let newDir = path.isAbsolute(input.substring(3)) ? input.substring(3) : path.resolve(currDir, input.substring(3));
    
            if (fs.existsSync(newDir)) {
                currDir = newDir;
            }
            else {
                console.log(invalidInputMsg);
            }
        }
        else if (input === 'ls') {
            await ls(currDir);
        }
        else if (input.substring(0, 3) === 'cat') {
            await cat(input.substring(4));
        }
        else if (input.substring(0, 3) === 'add') {
            await add(currDir, input.substring(4));
        }
        // в пул-реквесте не забыть указать, что в качестве аргументов должны быть прописаны имена файлов, которые не должны содержать пробелов, однако допускаются тире и нижние подчеркивания
        else if (input.substring(0, 2) === 'rn') {
            await rn(currDir, input.substring(3).split(' ')[0], input.substring(3).split(' ')[1]);
        }
        else if (input.substring(0, 2) === 'cp') {
            // console.log(getAbsolutePath(currDir, input.substring(3)));
        }
        else {
            console.log(invalidInputMsg);
        }
    }
    catch (err) {
        console.log(operationFailedMsg);
    }

    console.log(`You are currently in ${currDir}`);
});

rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${username}!`);
});

const ls = async (currDir) => {
    try {
        const files = await fs_promises.readdir(currDir);
        console.log(files);
    }
    catch (err) {
        throw err;
    }
};

const cat = async (filePath) => {
    try {
        const fileContent = await fs_promises.readFile(filePath, { encoding: 'utf-8' });
        console.log(fileContent);
    }
    catch (err) {
        throw err;
    }
};

const add = async (currDir, fileName) => {
    const filePath = path.join(currDir, fileName);

    try {
        await fs_promises.writeFile(filePath, '');
    }
    catch (err) {
        throw err;
    }
};

const rn = async (currDir, oldFileName, newFileName) => {
    const oldFilePath = path.join(currDir, oldFileName);
    const newFilePath = path.join(currDir, newFileName);

    try {
        await fs_promises.rename(oldFilePath, newFilePath);
    }
    catch (err) {
        throw err;
    }
};

// const copy = async (currDir, fileName, newFilePath) => {
//     const srcPath = path.join(currDir, fileName);
//     const dstPath = path.join(newFilePath, fileName);

//     try {
//         const files = await fs.readdir(srcPath);

//         await fs.mkdir(dstPath);

//         for (const file of files) {
//             await fs.cp(path.join(srcPath, file), path.join(dstPath, file));
//         }
//     }
//     catch {
//         throwError();
//     }
// };

// ====================

const getAbsolutePath = (currDir, filePath) => {
    return path.isAbsolute(filePath) ? filePath : path.join(currDir, filePath);
}