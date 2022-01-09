import getConfig from '../src/libs/getConfig'

describe('getConfig.ts', () => {
  test('Illegal options type', () => {
    expect(() => {
      getConfig(undefined)
    }).toThrow(
      '[vite-plugin-banner] The options must be a string or an object.'
    )
  })
})

describe('getConfig.ts', () => {
  test('Empty content', () => {
    expect(() => {
      getConfig({
        content: '',
        outDir: '',
      })
    }).toThrow('[vite-plugin-banner] The banner content can not be empty.')
  })
})

describe('getConfig.ts', () => {
  test('Valid options type', () => {
    expect(
      getConfig({
        content: 'Hello World',
        outDir: '',
      })
    ).toStrictEqual({
      content: 'Hello World',
      outDir: '',
    })
  })
})
