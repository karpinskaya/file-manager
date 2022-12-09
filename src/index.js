import app from './app.js';

await app();

// import * as os from 'os';
// import * as readline from 'readline';
// import * as path from 'path';
// import * as fs from 'fs';
// import * as fs_promises from 'fs/promises';
// import { pipeline, finished } from 'stream/promises';
// import { createHmac } from 'crypto';
// import * as zlib from 'zlib';
// import { Stream } from 'stream';

// let username = process.argv[2]?.split('=')[1] ? process.argv[2].split('=')[1] : 'User';
// let currDir = os.homedir();

// let invalidInputMsg = 'Invalid input';
// let operationFailedMsg = 'Operation failed';

// let commandsWithoutParams = ['up', 'ls'];
// let commandsWithParams = ['cd', 'cat', 'add', 'rn', 'cp', 'mv', 'rm', 'os', 'hash', 'compress', 'decompress'];
// let osParams = ['--EOL', '--cpus', '--homedir', '--username', '--architecture'];

// console.log(`Welcome to the File Manager, ${username}!`);
// console.log(`You are currently in ${currDir}`);

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// rl.on('line', async (input) => {
//     let [command, ...params] = input.split(' ');
//     params = params.join(' ');

//     if (command === '.exit') {
//         rl.close();
//         return;
//     }

//     try {
//         if (commandsWithoutParams.includes(command) && params.length === 0 || commandsWithParams.includes(command) && command !== 'os' && params.length > 0 || command === 'os' && osParams.includes(params)) {
//             if (command === 'up') {
//                 currDir = path.dirname(currDir);
//             }
//             else if (command === 'cd') {
//                 currDir = cd(currDir, params);
//             }
//             else if (command === 'ls') {
//                 await ls(currDir);
//             }
//             else if (command === 'cat') {
//                 console.log(await cat(currDir, params));
//             }
//             else if (command === 'add') {
//                 await add(currDir, params);
//             }
//             else if (command === 'rn') {
//                 await rn(currDir, params.split(' ')[0], params.split(' ')[1]);
//             }
//             else if (command === 'cp') {
//                 await cp(currDir, params.split(' ')[0], params.split(' ')[1]);
//             }
//             else if (command === 'mv') {
//                 await mv(currDir, params.split(' ')[0], params.split(' ')[1]);
//             }
//             else if (command === 'rm') {
//                 await rm(currDir, params);
//             }
//             else if (command === 'os') {
//                 osFunc(params);
//             }
//             else if (command === 'hash') {
//                 await hash(currDir, params);
//             }
//             else if (command === 'compress') {
//                 await compress(currDir, params.split(' ')[0], params.split(' ')[1]);
//             }
//             else if (command === 'decompress') {
//                 await decompress(currDir, params.split(' ')[0], params.split(' ')[1]);
//             }
//         }
//         else {
//             console.log(invalidInputMsg);
//         }
//     }
//     catch (err) {
//         console.log(operationFailedMsg);
//     }

//     printMsg(`You are currently in ${currDir}`);
//     // console.log(`You are currently in ${currDir}`);
// });

// rl.on('close', () => {
//     console.log(`Thank you for using File Manager, ${username}, goodbye!`);
// });

// const cd = (currDir, filePath) => {
//     let path = getAbsolutePath(currDir, filePath);

//     if (fs.existsSync(path)) {
//         return path;
//     }
//     else {
//         throw new Error();
//     }
// };

// const ls = async (currDir) => {
//     try {
//         const files = await fs_promises.readdir(currDir);
//         const res = [];
        
//         files.forEach((value, index, array) => {
//             res.push({ Name: value, Type: isFile(path.join(currDir, value)) });
//         });

//         console.table(res.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0))
//                          .sort((a,b) => (a.Type > b.Type) ? 1 : ((b.Type > a.Type) ? -1 : 0)));
//     }
//     catch (err) {
//         throw err;
//     }
// };

// const cat = async (currDir, filePath) => {
//     return await new Promise((resolve, reject) => {
//         const fPath = path.join(currDir, filePath);
//         let readStream = fs.createReadStream(fPath);
//         let fileContent = '';

//         readStream.on('data', (chunk) => {
//             fileContent += chunk;
//             resolve(fileContent);
//         });

//         readStream.on('error', (err) => {
//             reject(err);
//         });
//     });
// };

// const add = async (currDir, fileName) => {
//     const filePath = path.join(currDir, fileName);

//     try {
//         await fs_promises.writeFile(filePath, '');
//     }
//     catch (err) {
//         throw err;
//     }
// };

// const rn = async (currDir, oldFileName, newFileName) => {
//     const oldFilePath = path.join(currDir, oldFileName);
//     const newFilePath = path.join(currDir, newFileName);

//     try {
//         await fs_promises.rename(oldFilePath, newFilePath);
//     }
//     catch (err) {
//         throw err;
//     }
// };

// const cp = async (currDir, srcFile, dstPath) => {
//     const srcFilePath = getAbsolutePath(currDir, srcFile);
//     const dstFilePath = getAbsolutePath(dstPath, path.basename(srcFilePath));

//     try {
//         await pipeline(fs.createReadStream(srcFilePath), fs.createWriteStream(dstFilePath));
//     }
//     catch (err) {
//         throw err;
//     }
// };

// const mv = async (currDir, srcFile, dstPath) => {
//     try {
//         await cp(currDir, srcFile, dstPath);
//         await rm(currDir, srcFile);
//     }
//     catch (err) {
//         throw err;
//     }
// };

// const rm = async (currDir, filePath) => {
//     let path = getAbsolutePath(currDir, filePath);

//     try {
//         await fs_promises.rm(path);
//     }
//     catch (err) {
//         throw err;
//     }
// };

// const osFunc = (param) => {
//     if (param === '--EOL') {
//         console.log(JSON.stringify(os.EOL));
//     }
//     else if (param === '--cpus') {
//         console.log(os.cpus());
//     }
//     else if (param === '--homedir') {
//         console.log(os.homedir());
//     }
//     else if (param === '--username') {
//         console.log(os.userInfo().username);
//     }
//     else if (param === '--architecture') {
//         console.log(os.arch());
//     }
//     else {
//         throw new Error();
//     }
// };

// const hash = async (currDir, filePath) => {
//     let path = getAbsolutePath(currDir, filePath);

//     try {
//         const fileContent = await fs_promises.readFile(path, { encoding: 'utf-8' });
//         const hash = createHmac('sha256', fileContent).digest('hex');

//         console.log(hash);
//     }
//     catch (err) {
//         throw err;
//     }
// };

// const compress = async (currDir, srcFile, dstPath) => {
//     const srcFilePath = getAbsolutePath(currDir, srcFile);
//     const dstFilePath = getAbsolutePath(dstPath, `compressed_${path.basename(srcFilePath)}`);
//     const zip = zlib.createGzip();

//     if (fs.existsSync(srcFilePath)) {
//         await pipeline(fs.createReadStream(srcFilePath), zip, fs.createWriteStream(dstFilePath));
//     }
//     else {
//         throw new Error();
//     }
// }

// const decompress = async (currDir, srcFile, dstPath) => {
//     const srcFilePath = getAbsolutePath(currDir, srcFile);
//     const dstFilePath = getAbsolutePath(dstPath, `decompressed_${path.basename(srcFilePath)}`);
//     const unzip = zlib.createGunzip();

//     if (fs.existsSync(srcFilePath)) {
//         await pipeline(fs.createReadStream(srcFilePath), unzip, fs.createWriteStream(dstFilePath));
//     }
//     else {
//         throw new Error();
//     }
// }

// const isFile = (currDir) => {
//     return fs.lstatSync(currDir).isFile() ? 'file' : 'directory';
// };

// const getAbsolutePath = (currDir, filePath) => {
//     return path.isAbsolute(filePath) ? filePath : path.join(currDir, filePath);
// }

// const printMsg = (msg) => {
//     console.log(msg);
// }