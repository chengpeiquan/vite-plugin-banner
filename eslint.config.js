// @ts-check
import { defineFlatConfig, js, typescript } from '@bassist/eslint'

export default defineFlatConfig([
  ...js,
  ...typescript,
  {
    rules: {
      'no-console': 'off',
      'require-await': 'off',
    },
  },
  {
    ignores: ['dist', 'lib', 'types', 'test'],
  },
])
