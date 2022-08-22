/**
 * Some options from `vite.config.[ts|js]`
 * @tips This options type is supported since `0.2.0`
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
   * @tips This option is supported since `0.4.0`
   * @default `false`
   */
  debug?: boolean
}

/**
 * Configuration of the plugin's internal runtime
 */
export interface PluginConfig {
  content: string
  outDir: string
  debug: boolean
}
