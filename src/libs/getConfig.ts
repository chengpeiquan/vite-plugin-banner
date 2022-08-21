import verifyBanner from './verifyBanner'
import type { BannerPluginOptions, PluginConfig } from '../types'

export default function (options: string | BannerPluginOptions): PluginConfig {
  // Set a default config
  const config: PluginConfig = {
    content: '',
    outDir: '',
  }

  // illegal type
  const type: string = Object.prototype.toString.call(options)
  if (!['[object String]', '[object Object]'].includes(type)) {
    throw new Error(
      '[vite-plugin-banner] The options must be a string or an object.'
    )
  }

  // The options maybe a String
  if (typeof options === 'string') {
    config.content = options
  }

  // The options maybe an Object
  if (typeof options === 'object') {
    // Update the `content` option
    if (!Object.prototype.hasOwnProperty.call(options, 'content')) {
      throw new Error(`[vite-plugin-banner] Missing "content" option.`)
    }
    config.content = options.content

    // Update the `outDir` option
    if (
      Object.prototype.hasOwnProperty.call(options, 'outDir') &&
      typeof options.outDir === 'string'
    ) {
      config.outDir = options.outDir
    }
  }

  // Verify the validity of the incoming comment content
  const error: string = verifyBanner(config.content)
  if (error) {
    throw new Error(`[vite-plugin-banner] ${error}`)
  }

  return config
}
