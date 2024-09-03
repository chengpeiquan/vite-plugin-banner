import { verifyBanner } from '../src/utils'

describe('verifyBanner.ts', () => {
  test('Valid content', () => {
    expect(verifyBanner('Hello World')).toBe('')
  })
})

describe('verifyBanner.ts', () => {
  test('Empty content', () => {
    expect(verifyBanner('')).toBe('The banner content can not be empty.')
  })
})

describe('verifyBanner.ts', () => {
  test('Illegal content type', () => {
    expect(verifyBanner(null as any)).toBe(
      'The banner content must be a string.',
    )
  })
})

describe('verifyBanner.ts', () => {
  test('Illegal content type', () => {
    expect(verifyBanner(undefined as any)).toBe(
      'The banner content must be a string.',
    )
  })
})
