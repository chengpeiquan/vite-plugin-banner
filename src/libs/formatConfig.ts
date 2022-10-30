import verifyBanner from './verifyBanner'
import type {
  BannerPluginOptions,
  contentCallback,
  PluginConfig,
} from '../types'

/**
 * Process options of different formats into a unified format
 * @param options - Some options from `vite.config.[ts|js]`
 * @returns A unified plugin option
 */
export default function formatConfig(
  options: string | BannerPluginOptions | contentCallback
): PluginConfig {
  // Set a default config
  const config: PluginConfig = {
    content: '',
    outDir: 'dist',
    debug: false,
    verify: true,
    exclude: undefined,
  }

  // Type of plugin options
  const type: string = Object.prototype.toString.call(options)

  // Block illegal types
  if (!['[object String]', '[object Object]'].includes(type)) {
    throw new Error(
      '[vite-plugin-banner] The options must be a string or an object.'
    )
  }

  // The options maybe a String
  if (typeof options === 'string') {
    config.content = options
  }

  // The options maybe a String
  if (typeof options === 'function') {
    config.content = options
    return config
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

    // Update the `debug` option
    config.debug = Boolean(options.debug)

    // Update the `verify` option
    if (typeof options.verify === 'boolean') {
      config.verify = options.verify
    }

    // Update the `exclude` option
    if (
      typeof options.exclude === 'string' ||
      options.exclude instanceof RegExp ||
      typeof options.exclude === 'function'
    ) {
      config.exclude = options.exclude
    }
  }
  // No verification required
  if (!config.verify) return config

  if (typeof config.content === 'function') {
    return config
  }
  // Verify the validity of the incoming comment content
  const errMsg: string = verifyBanner(config.content)
  if (errMsg) {
    throw new Error(`[vite-plugin-banner] ${errMsg}`)
  }
  return config
}
