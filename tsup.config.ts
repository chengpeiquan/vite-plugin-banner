import { createBaseConfig } from '@bassist/build-config/tsup'
import { defineConfig } from 'tsup'
import pkg from './package.json'

const config = createBaseConfig({ pkg })

export default defineConfig(config)
