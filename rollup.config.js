import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';
import * as packageJson from './package.json';

const banner = `
  /**
   * @license
   * author: ${packageJson.author}
   * ${packageJson.name.replace(/^@.*\//, '')}.js v${packageJson.version}
   * Released under the ${packageJson.license} license.
   */
`;

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: false,
        name: 'ts-package-template',
        banner,
        exports: 'named',
      },
      {
        file: packageJson.module,
        format: 'esm',
        banner,
        sourcemap: false,
      },
    ],
    plugins: [
      external(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json', sourceMap: false }),
      terser(),
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];
