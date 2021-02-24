import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import banner2 from 'rollup-plugin-banner2'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

// 版权信息配置
const ResolveBanner = () => {
  return `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * author: ${pkg.author}\n */`;
}

const outputOpt = {
  format: 'cjs',
  sourcemap: true,
  exports: 'auto'
}

export default {
  input: 'src/main.ts',
  output: [
    {
      file: `dist/vite-plugin-banner.js`,
      ...outputOpt
    },
    {
      file: `dist/vite-plugin-banner.min.js`,
      plugins: [
        terser()
      ],
      ...outputOpt
    }
  ],
  external: [
    'rollup',
    'fs',
    'path'
  ],
  plugins: [
    resolve({
      browser: true
    }),
    babel({
      babelHelpers: 'bundled'
    }),
    commonjs(),
    json(),
    typescript(),
    banner2( ResolveBanner, {
      sourcemap: true
    })
  ]
};
