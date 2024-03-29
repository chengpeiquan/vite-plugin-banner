import fs from 'fs'
import { resolve } from 'path'
import formatConfig from './libs/formatConfig'
import type { ResolvedConfig } from 'vite'
import type { NormalizedOutputOptions, OutputBundle } from 'rollup'
import type {
  BannerPluginOptions,
  PluginConfig,
  ContentCallback,
} from './types'

export type {
  BannerPluginOptions,
  PluginConfig,
  ContentCallback,
} from './types'

// Extends the config from `vite.config.ts`
let viteConfig: ResolvedConfig

// File suffix that needs to be matched
const includeRegexp: RegExp = new RegExp(/\.(css|[mc]?js)$/i)

// Filename to exclude
const excludeRegexp: RegExp = new RegExp(/vendor/)

/**
 * Add banner comments to files
 * @param pluginOptions - A comment content or An option
 */
export default function (
  pluginOptions: string | BannerPluginOptions | ContentCallback
): any {
  // Get the plugin config
  const pluginConfig: PluginConfig = formatConfig(pluginOptions)

  // Handle files
  return {
    name: 'banner',
    configResolved(resolvedConfig: ResolvedConfig) {
      viteConfig = resolvedConfig
    },
    async writeBundle(options: NormalizedOutputOptions, bundle: OutputBundle) {
      for (const file of Object.entries(bundle)) {
        // Get the full path of file
        const root: string = viteConfig.root
        const outDir: string =
          pluginConfig.outDir || viteConfig.build.outDir || 'dist'
        const fileName: string = file[0].endsWith('.js-lean')
          ? file[0].replace(/\.js-lean/, '.lean.js')
          : file[0]
        const filePath: string = resolve(root, outDir, fileName)

        const { content: setContent } = pluginConfig

        // Only handle matching files
        if (includeRegexp.test(fileName) && !excludeRegexp.test(fileName)) {
          try {
            // Read the content from target file
            let data: string = fs.readFileSync(filePath, {
              encoding: 'utf8',
            })

            let myContent: string =
              typeof setContent === 'string' ? setContent : ''
            if (typeof setContent === 'function') {
              myContent = setContent(fileName)
            }
            if (myContent) {
              // If the banner content has comment symbol, use it directly
              if (
                myContent.includes('/*') ||
                myContent.includes('*/') ||
                !pluginConfig.verify
              ) {
                data = `${myContent}\n${data}`
              }
              // Otherwise add comment symbol
              else {
                data = `/*! ${myContent} */\n${data}`
              }
            }
            // Save
            fs.writeFileSync(filePath, data)
          } catch (e) {
            // The error log is only printed when the debug option is enabled
            if (pluginConfig.debug) {
              console.log(e)
            }
          }
        }
      }
    },
  }
}
