import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import banner2 from 'rollup-plugin-banner2'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

const outputOptions = {
  sourcemap: false,
  exports: 'auto',
  plugins: [terser()],
}

export default {
  input: 'src/main.ts',
  output: [
    {
      file: `dist/index.cjs`,
      format: 'cjs',
      ...outputOptions,
    },
    {
      file: `dist/index.mjs`,
      format: 'es',
      ...outputOptions,
    },
  ],
  external: ['rollup', 'fs', 'path'],
  plugins: [
    resolve({
      browser: true,
    }),
    babel({
      babelHelpers: 'bundled',
    }),
    commonjs(),
    json(),
    typescript(),
    banner2(
      () =>
        `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * author: ${pkg.author}\n * repo: ${pkg.homepage}\n */\n`,
      {
        sourcemap: true,
      }
    ),
  ],
}
