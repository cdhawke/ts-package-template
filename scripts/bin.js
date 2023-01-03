#!/usr/bin/env node

const { execSync } = require('child_process');
const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Failed to execute ${command}`, e);
    return false;
  }
  return true;
};

const repo = process.argv[2];
const gitCheckout = `git clone --depth 1 https://github.com/cdhawke/ts-package-template.git ${repo}`;
const installDeps = `cd ${repo} && yarn install`;
console.log('Cloning...');
const checkedOut = runCommand(gitCheckout);
if (!checkedOut) {
  process.exit(-1);
}

console.log('Installing Dependencies...');
const depsInstalled = runCommand(installDeps);
if (!depsInstalled) {
  process.exit(-1);
}

// if (yargs.argv.react) {
//   console.log('Installing React dependencies');
//   exec(
//     'yarn add -D eslint-plugin-react-hooks eslint-plugin-react @types/react @testing-library/react-hooks @testing-library/react'
//   );
// }
