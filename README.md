# vite-plugin-banner

A banner plugin for Vite.

## Features

Adds a banner to the top of each generated chunk.

## Usage

> ℹ️ **Only support Vite 2.**

### Install

Install the package from npm or yarn.

```bash
npm install --save-dev vite-plugin-banner
```

### Basic usage

Add it to `vite.config.ts`

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import Banner from 'vite-plugin-banner'

export default defineConfig({
  plugins: [
    Banner('This is the Banner content.'),
  ]
})
```

When you run `npm run build` on your project, In the `dist` folder, Except for `vendor` files, all `js` and `css` files will add a banner to the top.

e.g. in `app.b3a7772e.js`

```js
/* This is the Banner content. */
var e=Object.assign;import{M as t,d as a,u as r,c......
```

