/**
 * Some options from `vite.config.[ts|js]`
 * @since 0.2.0
 */
export interface BannerPluginOptions {
  /**
   * The comment content of the banner
   */
  content: string

  /**
   * The output directory from the configuration of Vite.js
   * @default `dist`
   */
  outDir?: string

  /**
   * Whether to print error messages to the console
   * @since 0.4.0
   * @default `false`
   */
  debug?: boolean

  /**
   * By default, the validity of the content will be verified.
   * If set to `false`, no verification will be performed.
   * @see https://github.com/chengpeiquan/vite-plugin-banner/issues/13
   * @since 0.5.0
   * @default `true`
   */
  verify?: boolean
}

/**
 * Configuration of the plugin's internal runtime
 */
export interface PluginConfig {
  content: string
  outDir: string
  debug: boolean
  verify: boolean
}
