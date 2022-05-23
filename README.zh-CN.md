<p align='center'>
  <img src="https://cdn.jsdelivr.net/gh/chengpeiquan/assets-storage/img/2021/02/20210224005014.png" alt="vite-plugin-banner" />
</p>

<p align='center'>
  <a href='https://www.npmjs.com/package/vite-plugin-banner'>
    <img src="https://img.shields.io/npm/v/vite-plugin-banner?color=56b7ff&label=npm" />
  </a>
</p>
<br>
<br>

[English](https://github.com/chengpeiquan/vite-plugin-banner/blob/main/README.md) | 简体中文

## 功能

为每个 chunk 文件头部添加 banner 注释。

> ℹ️ **只支持 Vite 2.** <br>从 v0.3.0 开始，支持处理 ESM 和 CommonJS 模块文件。

## 安装

从 npm (或者 yarn 或者 pnpm) 安装：

```bash
npm install --save-dev vite-plugin-banner
```

## 选项

从 `v0.2.0` 开始, 这个插件支持使用 `String` 或者 `Object` 格式来作为插件选项。

插件选项类型|作用描述|使用例子
:--|:--|:--
string|横幅注释的内容|[基础用法](#基础用法)
{ outDir: string; content: string }|content: 横幅注释的内容<br>outDir: 来自 Vite 指定的输出目录|[可选参数格式](#可选参数格式)

## 用法

在大多数情况下，只需使用 `String` 格式作为插件选项。

在一些特殊情况下，比如在 [VitePress](https://vitepress.vuejs.org/) 中，需要使用 `Object` 格式来传递插件选项，详见 [可选参数格式](#可选参数格式) 。

### 基础用法

在 `vite.config.ts` 添加：

```ts
// vite.config.ts
import banner from 'vite-plugin-banner'
// Other dependencies...

export default defineConfig({
  plugins: [
    banner('This is the banner content.'),
  ]
})
```

当你在你的项目上运行 `npm run build` 打包的时候，在 `dist` 文件夹（或者你在 `vite.config.ts` 配置的其他 [build.outDir](https://vitejs.dev/config/#build-outdir) ），除了 `vendor` 文件外，所有的 `js` 和 `css` 文件都会添加一个 banner 注释在文件顶部。

例如，在生成的 `app.b3a7772e.js` 里:

```js
/* This is the banner content. */
var e=Object.assign;import{M as t,d as a,u as r,c......
```

### 高级用法

当然，最理想的 banner 注释是和你的项目信息相关联。

首先，你需要更新你的 `package.json` 文件，像这样，包含类似的字段内容：

```json
{
  "name": "chengpeiquan.com",
  "version": "0.1.0",
  "description": "My personal website, technology stack based on Vue.js 3.0, and Vite 2.0, use Server Side Generation.",
  "author": "chengpeiquan",
  "homepage": "https://chengpeiquan.com/"
}
```

然后，在你的 `vite.config.ts` 导入 `package.json`，像这样更新 banner 插件的内容：

```ts
// vite.config.ts
import pkg from './package.json'
// Other dependencies...

export default defineConfig({
  plugins: [
    banner(`/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`),
  ]
})
```

运行 `npm run build` 打包, 你可以看到生成出来的 banner 注释更详细：

例如，在生成的 `app.6936be52.js` 里:

```js
/**
 * name: chengpeiquan.com
 * version: v0.1.0
 * description: My personal website, technology stack based on Vue.js 3.0, and Vite 2.0, use Server Side Generation.
 * author: chengpeiquan
 * homepage: https://chengpeiquan.com/
 */
var e=Object.assign;import{M as t,d as a,u as r,c......
```

### 趣味用法

如果你想制作一些个性化的 banner 注释，像什么表白啊、佛系啊、招聘信息啊什么的，可以通过一些在线生成器去制作有趣的内容。

比如在这些网站上可以直接生成:

- [http://www.network-science.de/ascii/](http://www.network-science.de/ascii/)

- [https://www.bootschool.net/ascii](https://www.bootschool.net/ascii)

```ts
// vite.config.ts
export default defineConfig({
  plugins: [
    banner(`
    ██   ██         ███████   ██      ██ ████████   ██    ██   ███████   ██     ██
    ░██  ░██        ██░░░░░██ ░██     ░██░██░░░░░   ░░██  ██   ██░░░░░██ ░██    ░██
    ░██  ░██       ██     ░░██░██     ░██░██         ░░████   ██     ░░██░██    ░██
    ░██  ░██      ░██      ░██░░██    ██ ░███████     ░░██   ░██      ░██░██    ░██
    ░██  ░██      ░██      ░██ ░░██  ██  ░██░░░░       ░██   ░██      ░██░██    ░██
    ░██  ░██      ░░██     ██   ░░████   ░██           ░██   ░░██     ██ ░██    ░██
    ░██  ░████████ ░░███████     ░░██    ░████████     ░██    ░░███████  ░░███████ 
    ░░   ░░░░░░░░   ░░░░░░░       ░░     ░░░░░░░░      ░░      ░░░░░░░    ░░░░░░░  
    `)
  ]
})
```

执行 `npm run build` 打包,  还是在 `app.d9a287b8.js` ，现在变成了：

```js
/* 
    ██   ██         ███████   ██      ██ ████████   ██    ██   ███████   ██     ██
    ░██  ░██        ██░░░░░██ ░██     ░██░██░░░░░   ░░██  ██   ██░░░░░██ ░██    ░██
    ░██  ░██       ██     ░░██░██     ░██░██         ░░████   ██     ░░██░██    ░██
    ░██  ░██      ░██      ░██░░██    ██ ░███████     ░░██   ░██      ░██░██    ░██
    ░██  ░██      ░██      ░██ ░░██  ██  ░██░░░░       ░██   ░██      ░██░██    ░██
    ░██  ░██      ░░██     ██   ░░████   ░██           ░██   ░░██     ██ ░██    ░██
    ░██  ░████████ ░░███████     ░░██    ░████████     ░██    ░░███████  ░░███████ 
    ░░   ░░░░░░░░   ░░░░░░░       ░░     ░░░░░░░░      ░░      ░░░░░░░    ░░░░░░░  
     */
var e=Object.assign;import{M as t,d as a,u as r,c......
```

### 可选参数格式

我不确定除了 VitePress 还有哪些场景需要用到这种方式来传入选项，所以我用 VitePress 来举例，希望能给到你参考。

```ts
// docs/.vitepress/config.ts
import { defineConfig } from 'vitepress'
import banner from 'vite-plugin-banner'
import pkg from '../../package.json'

const outDir = '../dist'

export default defineConfig({
  // 指定打包的输出目录
  outDir,

  // 使用 Vite 插件
  vite: {
    plugins: [
      // 请记住在这里使用 Object 格式的选项
      banner({
        outDir,
        content: `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`,
      }),
    ],
  },
  // ...
})
```

为什么要这么做？

因为在 VitePress 里，通过 viteConfig.build.outDir 拿到的永远是一个 `.temp` 的临时目录，不是最终的输出目录，所以你需要手动指定输出目录来告知插件。

## License

MIT License © 2021 [chengpeiquan](https://github.com/chengpeiquan)
