import { defineConfig } from 'tsup'
import {
  BundleFormat,
  getBundleBanner,
  getBundleExtension,
} from '@bassist/node-utils'
import pkg from './package.json'

export default defineConfig({
  entry: ['src/index.ts'],
  target: ['es2020'],
  format: [BundleFormat.CJS, BundleFormat.ESM],
  globalName: 'Banner',
  outExtension: (ctx) => getBundleExtension(ctx),
  outDir: 'dist',
  dts: true,
  banner: {
    js: getBundleBanner(pkg),
  },
  bundle: true,
  minify: true,
  clean: true,
})
