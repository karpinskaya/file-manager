import os from 'os';
import { osParams } from '../constants.js';

export const osService = (command) => {
    switch (command) {
        case osParams.EOL:
            console.log(JSON.stringify(os.EOL));
            break;
        case osParams.cpus:
            console.log(
                `=== Overall amount of CPUS is ${os.cpus().length} ===`
            );
            os.cpus().forEach((cpu, i) => {
                console.log(
                    `${i + 1} - Model: ${cpu.model}, clock rate: ${
                        cpu.speed * 0.001
                    }GHz`
                );
            });
            break;
        case osParams.homedir:
            console.log(os.userInfo().homedir);
            break;
        case osParams.username:
            console.log(os.userInfo().username);
            break;
        case osParams.architecture:
            console.log(os.arch());
            break;
        default:
            throw new Error();
    }
};
