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

English | [简体中文](https://github.com/chengpeiquan/vite-plugin-banner/blob/main/README.zh-CN.md)

## Features

Adds a banner to the top of each generated chunk.

## Install

Install the package from npm (or yarn, or pnpm).

```bash
npm install -D vite-plugin-banner
```

## Options

| Plugin Options Type | Description                     | Example                                                 |
| :------------------ | :------------------------------ | :------------------------------------------------------ |
| string              | The banner content              | [Basic usage](#basic-usage)                             |
| BannerPluginOptions | See the type declarations below | [Optional parameter format](#optional-parameter-format) |

· Type Declarations:

```ts
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
```

## Usage

In most cases, just use the `String` format as a plugin option.

In some special cases, such as in [VitePress](https://vitepress.vuejs.org/), you might need to use `Object` format to pass in plugin options, see [Optional parameter format](#optional-parameter-format).

### Basic usage

Add it to `vite.config.ts`

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

When you run `npm run build` on your project, In the `dist` folder(Or the [build.outDir](https://vitejs.dev/config/#build-outdir) in `vite.config.ts` you configured), Except for `vendor` files, all `js` and `css` files will add a banner to the top.

e.g. in `app.b3a7772e.js`:

```js
/* This is the banner content. */
var e=Object.assign;import{M as t,d as a,u as r,c......
```

### Add different banner by file name

filename callbacks are supported since `0.6.0`. Return values of `null` or `""` means not injected, while string returns are injected.

e.g.

```ts
// vite.config.ts
import banner from 'vite-plugin-banner'
// Other dependencies...

export default defineConfig({
  plugins: [
    banner((fileName: string) => fileName.endsWith('.js') ? 'this message will inject into js file' : ''),
  ]
})
```
In this way, it will add the banner to the `.js` file, of course, it is convenient to customize the flow for different returns. Different banners can be added for different types of files (e.g. `css` and `js`), which may not be very useful for all users, but it is possible to package css, font, images etc. into a single css file at packaging time for tampermonkey + vue, which can be written via resource.

The `connect` parameter is also supported.


### Advanced usage

Of course, the most ideal banner is related to your package information.

First, You need to update your `package.json` like this, For example, it contains such field content:

```json
{
  "name": "chengpeiquan.com",
  "version": "0.1.0",
  "description": "My personal website, technology stack based on Vue.js 3.0, and Vite 2.0, use Server Side Generation.",
  "author": "chengpeiquan",
  "homepage": "https://chengpeiquan.com/"
}
```

Then, import the `package.json` into `vite.config.ts`, update the banner like this:

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

Run `npm run build`, you can see the banner become more detailed.

e.g. in `app.6936be52.js`:

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

### Fun usage

If you want to make some banners that show your personality, you can make some interesting content from some online generators.

Such as:

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

Run `npm run build`,  e.g. in `app.d9a287b8.js`:

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

### Optional parameter format

I'm not sure what other scenarios besides VitePress need to use this method to pass in options, so I use VitePress as an example, I hope it can give you a reference.

```ts
// docs/.vitepress/config.ts
import { defineConfig } from 'vitepress'
import banner from 'vite-plugin-banner'
import pkg from '../../package.json'

const outDir = '../dist'

export default defineConfig({
  // Specify the output directory for packaging
  outDir,

  // Use Vite plugins
  vite: {
    plugins: [
      // Please remember to use the options in Object format here
      banner({
        outDir,
        content: `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`,
      }),
    ],
  },
  // ...
})
```

Why do it?

Because in VitePress, what you get through `viteConfig.build.outDir` is always a `.temp` temporary directory, not the final output directory, so you need to manually specify the output directory to inform the plugin.

Of course, with the updated version of Vitepress, this is not necessarily required, but you can choose to do so when you need it.

## License

MIT License © 2021 [chengpeiquan](https://github.com/chengpeiquan)
