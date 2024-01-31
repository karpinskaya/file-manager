export const noParamsCmd = ['up', 'ls'];
export const oneParamCmd = ['cd', 'cat', 'add', 'rm', 'os', 'hash'];
export const twoParamsCmd = ['rn', 'cp', 'mv', 'compress', 'decompress'];
export const osParams = [
    '--EOL',
    '--cpus',
    '--homedir',
    '--username',
    '--architecture',
];

export const allCommands = {
    up: 'up',
    cd: 'cd',
    ls: 'ls',
    cat: 'cat',
    add: 'add',
    rn: 'rn',
    cp: 'cp',
    mv: 'mv',
    rm: 'rm',
    os: 'os',
    hash: 'hash',
    compress: 'compress',
    decompress: 'decompress',
};

export const errorMsg = {
    invalidInput: 'Invalid input',
    operationFailed: 'Operation failed',
};
