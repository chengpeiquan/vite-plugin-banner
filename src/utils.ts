import type { PluginConfig, UnionPluginOptions } from './types'

/**
 * Verify the banner content
 *
 * @param content - The content of banner
 * @returns The error message, when success, if will be a empty string
 */
export const verifyBanner = (content: string): string => {
  // illegal type
  if (typeof content !== 'string') {
    return 'The banner content must be a string.'
  }

  // No content
  if (!content) {
    return 'The banner content can not be empty.'
  }

  // The comment symbols not in pairs
  if (
    (content.includes('/*') && !content.includes('*/')) ||
    (!content.includes('/*') && content.includes('*/'))
  ) {
    return 'If you want to pass in comment symbols, you must pass them in pairs.'
  }

  // Ok
  return ''
}

/**
 * Process options of different formats into a unified format
 *
 * @param options - Some options from `vite.config.[ts|js]`
 * @returns A unified plugin option
 */
export const getPluginConfig = (options: UnionPluginOptions): PluginConfig => {
  // Set a default config
  const config: PluginConfig = {
    content: '',
    outDir: '',
    debug: false,
    verify: true,
  }

  // Type of plugin options
  const type: string = Object.prototype.toString.call(options)

  // Block illegal types
  if (
    !['[object String]', '[object Object]', '[object Function]'].includes(type)
  ) {
    throw new Error(
      '[vite-plugin-banner] The options must be a string, an object or a function.',
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
  }

  // No verification required
  if (!config.verify) return config

  if (typeof config.content === 'function') return config

  // Verify the validity of the incoming comment content
  const errMsg = verifyBanner(config.content)
  if (errMsg) {
    throw new Error(`[vite-plugin-banner] ${errMsg}`)
  }

  return config
}
