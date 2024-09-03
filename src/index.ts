import fs from 'node:fs'
import { resolve } from 'node:path'
import { getPluginConfig } from './utils'
import type {
  PluginOption as VitePluginOption,
  ResolvedConfig as ViteResolvedConfig,
} from 'vite'
import type { PluginConfig, UnionPluginOptions } from './types'

export type {
  BannerPluginOptions,
  PluginConfig,
  ContentCallback,
} from './types'

// Extends the config from `vite.config.ts`
let viteConfig: ViteResolvedConfig

// File suffix that needs to be matched
const includeRegexp = new RegExp(/\.(css|[mc]?js)$/i)

// Filename to exclude
const excludeRegexp = new RegExp(/vendor/)

/**
 * Add banner comments to files
 *
 * @param pluginOptions - A comment content or An option
 */
export default function (pluginOptions: UnionPluginOptions) {
  // Get the plugin config
  const pluginConfig: PluginConfig = getPluginConfig(pluginOptions)

  // Handle files
  return {
    name: 'banner',
    apply: 'build',
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig
    },
    async writeBundle(_, bundle) {
      for (const file of Object.entries(bundle)) {
        // Get the full path of file
        const root = viteConfig.root
        const outDir = pluginConfig.outDir || viteConfig.build.outDir

        const fileName = file[0].endsWith('.js-lean')
          ? file[0].replace(/\.js-lean/, '.lean.js')
          : file[0]

        const filePath = resolve(root, outDir, fileName)

        const { content: setContent } = pluginConfig

        // Only handle matching files
        if (includeRegexp.test(fileName) && !excludeRegexp.test(fileName)) {
          try {
            // Read the content from target file
            let data: string = fs.readFileSync(filePath, {
              encoding: 'utf8',
            })

            let myContent = typeof setContent === 'string' ? setContent : ''

            if (typeof setContent === 'function') {
              myContent = setContent(fileName) ?? ''
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
  } satisfies VitePluginOption
}
