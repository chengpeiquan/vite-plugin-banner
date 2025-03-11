import { getPluginConfig } from '../src/utils'

function callback(fileName: string) {
  return fileName.endsWith('.js')
    ? 'This message will inject into `js` files.'
    : 'This message will inject into other files.'
}

describe('getPluginConfig.ts', () => {
  test('Illegal options type', () => {
    expect(() => {
      getPluginConfig(undefined as any)
    }).toThrow(
      '[vite-plugin-banner] The options must be a string, an object or a function.',
    )
  })
})

describe('getPluginConfig.ts', () => {
  test('Empty content', () => {
    expect(() => {
      getPluginConfig({
        content: '',
        outDir: '',
      })
    }).toThrow('[vite-plugin-banner] The banner content can not be empty.')
  })
})

describe('getPluginConfig.ts', () => {
  test('Valid options type', () => {
    expect(
      getPluginConfig({
        content: 'Hello World',
        outDir: '',
      }),
    ).toStrictEqual({
      content: 'Hello World',
      outDir: '',
      debug: false,
      verify: true,
    })
  })
})

describe('getPluginConfig.ts', () => {
  test('Functional content', () => {
    expect(getPluginConfig(callback)).toStrictEqual({
      content: callback,
      outDir: '',
      debug: false,
      verify: true,
    })
  })
})

describe('getPluginConfig.ts', () => {
  test('The `content` option use `function` type', () => {
    expect(getPluginConfig(callback)).toStrictEqual({
      content: callback,
      outDir: '',
      debug: false,
      verify: true,
    })
  })
})
