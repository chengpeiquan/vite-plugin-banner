/* eslint-disable no-unused-vars */
/**
 * Some options from `vite.config.[ts|js]`
 * @since 0.2.0
 */
export interface BannerPluginOptions {
  /**
   * The comment content of the banner
   *
   * @since 0.6.0
   *
   * callback function available since 0.6.0
   * @example <caption>content Callback(since 0.6.0)</caption>
   * ```ts
   * content: (fileName: string) => fileName.endsWith('.js') ? 'this message will inject into js file' : ''
   * // inject into js file, but not inject into css file
   * // You can also continue to write other flows.
   * ```
   * @param fileName - The name of the file
   * @returns {string | ContentCallback} What want to inject into the file. More details see {@link ContentCallback}
   */
  content: string | ContentCallback

  /**
   * The output directory from the configuration of Vite.js
   * @default 'dist'
   */
  outDir?: string

  /**
   * Whether to print error messages to the console
   * @since 0.4.0
   * @default false
   */
  debug?: boolean

  /**
   * By default, the validity of the content will be verified.
   *
   * If set to `false`, no verification will be performed.
   * @see https://github.com/chengpeiquan/vite-plugin-banner/issues/13
   * @since 0.5.0
   * @default true
   */
  verify?: boolean
}

/**
 * Configuration of the plugin's internal runtime
 */
export interface PluginConfig {
  content: string | ContentCallback
  outDir: string
  debug: boolean
  verify: boolean
}

/** Callback function to get the contents to be injected.(or not inject)
 * @param {string} fileName - current File name
 * @returns {string | null} What to inject into the file.
 *
 * `null` or `""`: do not inject anything.
 *
 * `string`: the string to inject.
 */
export type ContentCallback = (fileName: string) => string | null
