import fs from 'fs'
import { resolve } from 'path'
import type { Plugin, ResolvedConfig } from 'vite'

// 来自vite.config.ts的配置继承
let viteConfig: ResolvedConfig;

// 需要匹配的文件后缀
const includeRegexp: RegExp = new RegExp(/\.(css|js)$/i);

// 需要排除的文件名
const excludeRegexp: RegExp = new RegExp(/vendor/);

/** 
 * 给文件添加banner注释
 * @param {string} comment - 注释的内容，可以包含注释符号，也可以只传内容
 */
const banner = (comment: string): Plugin | unknown => {
  // 注释符不成对的时候，需要报错
  // if (
  //   (comment.includes('/*') && !comment.includes('*/'))
  //   ||
  //   (!comment.includes('/*') && comment.includes('*/'))
  // ) {
  //   throw new Error('[vite-plugin-banner] If you want to pass in comment symbols, you must pass them in pairs.');
  // }

  // 处理文件
  return {
    name: 'banner',
    configResolved (resolvedConfig: ResolvedConfig) {
      viteConfig = resolvedConfig;
    },
    async writeBundle (options: unknown, bundle: unknown) {
      for ( const file of Object.entries(bundle) ) {
        // 获取文件路径
        const root: string = viteConfig.root;
        const outDir: string = viteConfig.build.outDir || 'dist';
        const fileName: string = file[0];
        const filePath: string = resolve(root, outDir, fileName);

        // 只处理匹配到的文件
        if ( includeRegexp.test(fileName) && !excludeRegexp.test(fileName) ) {
          try {
            // 读取文件内容
            let data: unknown = fs.readFileSync(filePath, {
              encoding: 'utf8'
            })

            // 如果传入了注释符，则按传入的处理
            if ( comment.includes('/*') || comment.includes('*/') ) {
              data = `${comment}\n${data}`
            }
            // 否则添加注释符
            else {
              data = `/* ${comment} */\n${data}`
            }

            fs.writeFileSync(filePath, data)
          }
          catch (e) {
            console.log(e);
          }
        }
      }
    }
  }
}

export default banner;