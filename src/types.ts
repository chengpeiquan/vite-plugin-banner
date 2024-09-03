/**
 * Some options from `vite.config.[ts|js]`
 *
 * @since 0.2.0
 */
export interface BannerPluginOptions {
  /**
   * The comment content of the banner
   *
   * @since ^0.6.0 support for `ContentCallback` types
   */
  content: string | ContentCallback

  /**
   * The output directory from the configuration of Vite.js
   *
   * @see https://vitejs.dev/config/build-options.html#build-outdir
   *
   * @default viteConfig.build.outDir
   */
  outDir?: string

  /**
   * Whether to print error messages to the console
   *
   * @since 0.4.0
   *
   * @default false
   */
  debug?: boolean

  /**
   * By default, the validity of the content will be verified.
   *
   * If set to `false`, no verification will be performed.
   *
   * @see https://github.com/chengpeiquan/vite-plugin-banner/issues/13
   *
   * @since 0.5.0
   *
   * @default true
   */
  verify?: boolean
}

/**
 * Callback function to get the contents to be injected.(or not inject)
 *
 * @since 0.6.0
 *
 * @param fileName - The name of the file currently being processed
 *
 * @returns
 *  1. When a valid string is returned, it will become the banner content
 *  2. Returning a Falsy value will skip processing(e.g. `''`, `null`, `undefined`)
 *
 * @example
 *
 * ```ts
 *  content: (fileName: string) => {
 *    // Or use switch statement
 *    return fileName.endsWith('.js')
 *      ? 'This message will inject into `js` files.'
 *      : 'This message will inject into other files.'
 *  }
 * ```
 */
export type ContentCallback = (fileName: string) => string | null | undefined

export type UnionPluginOptions = string | BannerPluginOptions | ContentCallback

/**
 * Configuration of the plugin's internal runtime
 */
export interface PluginConfig {
  content: string | ContentCallback
  outDir: string
  debug: boolean
  verify: boolean
}
