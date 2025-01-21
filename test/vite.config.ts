import { defineConfig } from 'vite'

import banner from '../src/index'

// A dummy config to make sure the TS types are correct

export default defineConfig({
  plugins: [banner('This is the banner content.')],
})
