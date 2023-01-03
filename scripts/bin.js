#!/usr/bin/env node

const yargs = require('yargs');
var exec = require('child_process').exec;
if (yargs.argv.react) {
  console.log('Installing React dependencies');
  exec(
    'yarn add -D eslint-plugin-react-hooks eslint-plugin-react @types/react @testing-library/react-hooks @testing-library/react'
  );
}
