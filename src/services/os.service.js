import * as os from 'os';
import { OS_PARAMS } from '../constants.js';

export const osFunc = (param) => {
    if (param === OS_PARAMS.eol) {
        console.log(JSON.stringify(os.EOL));
    }
    else if (param === OS_PARAMS.cpus) {
        console.log(os.cpus());
    }
    else if (param === OS_PARAMS.homedir) {
        console.log(os.homedir());
    }
    else if (param === OS_PARAMS.username) {
        console.log(os.userInfo().username);
    }
    else if (param === OS_PARAMS.architecture) {
        console.log(os.arch());
    }
    else {
        throw new Error();
    }
};