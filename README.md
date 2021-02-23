# vite-plugin-banner

A banner plugin for Vite.

## Features

Adds a banner to the top of each generated chunk.

## Usage

> ℹ️ **Only support for Vite 2.**

### Install

Install the package from npm (or yarn).

```bash
npm install --save-dev vite-plugin-banner
```

### Basic usage

Add it to `vite.config.ts`

```ts
// vite.config.ts
import Banner from 'vite-plugin-banner'
// Other dependencies...

export default defineConfig({
  plugins: [
    Banner('This is the Banner content.'),
  ]
})
```

When you run `npm run build` on your project, In the `dist` folder, Except for `vendor` files, all `js` and `css` files will add a banner to the top.

e.g. in `app.b3a7772e.js`:

```js
/* This is the Banner content. */
var e=Object.assign;import{M as t,d as a,u as r,c......
```

### Advanced usage

Of course, the most ideal banner is related to your package information.

First, You need to update your `package.json` like this, For example, it contains such field content:

```json
// package.json
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
    Banner(`/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: v${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`),
  ]
})
```

Run `npm run build`, you can see the banner become more detailed.

e.g. in `app.b3a7772e.js`:

```js
/**
 * name: chengpeiquan.com
 * version: v0.1.0
 * description: vMy personal website, technology stack based on Vue.js 3.0, and Vite 2.0, use Server Side Generation.
 * author: chengpeiquan
 * homepage: https://chengpeiquan.com/
 */
var e=Object.assign;import{M as t,d as a,u as r,c......
```