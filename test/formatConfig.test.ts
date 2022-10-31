import formatConfig from '../src/libs/formatConfig'

function callback(fileName: string) {
  return fileName.endsWith('.js')
    ? 'This message will inject into `js` files.'
    : 'This message will inject into other files.'
}

describe('formatConfig.ts', () => {
  test('Illegal options type', () => {
    expect(() => {
      formatConfig(undefined as any)
    }).toThrow(
      '[vite-plugin-banner] The options must be a string, an object or a function.'
    )
  })
})

describe('formatConfig.ts', () => {
  test('Empty content', () => {
    expect(() => {
      formatConfig({
        content: '',
        outDir: '',
      })
    }).toThrow('[vite-plugin-banner] The banner content can not be empty.')
  })
})

describe('formatConfig.ts', () => {
  test('Valid options type', () => {
    expect(
      formatConfig({
        content: 'Hello World',
        outDir: '',
      })
    ).toStrictEqual({
      content: 'Hello World',
      outDir: '',
      debug: false,
      verify: true,
    })
  })
})

describe('formatConfig.ts', () => {
  test('Functional content', () => {
    expect(formatConfig(callback)).toStrictEqual({
      content: callback,
      outDir: 'dist',
      debug: false,
      verify: true,
    })
  })
})

describe('formatConfig.ts', () => {
  test('The `content` option use `function` type', () => {
    expect(formatConfig(callback)).toStrictEqual({
      content: callback,
      outDir: 'dist',
      debug: false,
      verify: true,
    })
  })
})
