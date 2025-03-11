// @ts-check
import {
  createGetConfigNameFactory,
  defineFlatConfig,
  imports,
  javascript,
  node,
  typescript,
} from '@bassist/eslint-config'

const getConfigName = createGetConfigNameFactory('banner')

export default defineFlatConfig([
  ...javascript,
  ...node,
  ...imports,
  ...typescript,
  {
    name: getConfigName('override'),
    rules: {
      'no-console': 'off',
      'require-await': 'off',
    },
  },
  {
    name: getConfigName('ignore'),
    ignores: ['dist', 'lib', 'types', 'test'],
  },
])
