#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
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

console.log('Installing common dependencies...');
const depsInstalled = runCommand(installDeps);
if (!depsInstalled) {
  process.exit(-1);
}

console.log(
  'Replacing all instances of "ts-package-template" with the new package name...'
);
runCommand(
  `LC_ALL=C find ${repo} -type f -exec sed -i '' 's/ts-package-template/${repo}/g' {} +`
);
runCommand(
  `LC_ALL=C find ${repo} -type f -exec sed -i '' 's/create-ts-package-template/${repo}/g' {} +`
);

console.log('Replacing readme...');
runCommand(`rm ${repo}/README.md`);
runCommand(`mv ${repo}scripts/README_template.md ${repo}/README.md`);

console.log('Removing unnecessary files...');
runCommand(`rm -rf ${repo}/.git`);
runCommand(`rm -rf ${repo}/scripts`);

const react = process.argv.includes('--react');

if (react) {
  console.log('Installing React dependencies');
  const reactDeps = runCommand(
    'yarn add -D eslint-plugin-react-hooks eslint-plugin-react @types/react @testing-library/react-hooks @testing-library/react'
  );
  if (!reactDeps) {
    process.exit(-1);
  }

  const tsconfig = JSON.parse(fs.readFileSync(`${repo}/tsconfig.json`));
  const eslintrc = JSON.parse(fs.readFileSync(`${repo}/.eslintrc.json`));
  console.log('Configuring tsconfig.json for React');
  tsconfig.compilerOptions.jsx = 'react';
  fs.writeFileSync(`${repo}/tsconfig.json`, JSON.stringify(tsconfig, null, 2));

  console.log('Configuring eslint for React');
  eslintrc.plugins.push('react');
  eslintrc.parserOptions.ecmaFeatures = {
    jsx: true,
  };
  eslintrc.extends.push('plugin:react/jsx-runtime');
  eslintrc.extends.push('plugin:react-hooks/recommended');
  fs.writeFileSync(`${repo}/.eslintrc.json`, JSON.stringify(eslintrc, null, 2));
}

console.log('Formatting files...');
const formatted = runCommand(
  `cd ${repo} && yarn run prettier --write "./**/*.{ts,js,json}"`
);
if (!formatted) {
  process.exit(-1);
}

console.log('Initializing git...');
const git = runCommand(`cd ${repo} && git init`);
if (!git) {
  process.exit(-1);
}

console.log('Done!');
