/**
 * The plugin input parameter can be an object
 * @param content - The comment content of the banner
 * @param outDir - The output directory from vite
 */
export interface BannerPluginOptions {
  content: string
  outDir?: string
}

/**
 * The config for the plugin
 */
export interface PluginConfig {
  content: string
  outDir: string
}
