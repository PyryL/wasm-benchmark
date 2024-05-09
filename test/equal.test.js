import { equal } from '../src/services/runTest'

describe('equal', () => {
  test('two numbers equal', () => {
    expect(equal(2, 2)).toBe(true)
  })

  test('two strings equal', () => {
    expect(equal('hello world', 'hello world')).toBe(true)
  })

  test('string and number do not equal', () => {
    expect(equal('12', 12)).toBe(false)
  })

  test('number and bigint do not equal', () => {
    expect(equal(12, 12n)).toBe(false)
  })

  test('arrays equal', () => {
    expect(equal([1, 'foo', 2], [1, 'foo', 2])).toBe(true)
  })

  test('order of items in array matter', () => {
    expect(equal([1, 2], [2, 1])).toBe(false)
  })

  test('multidimensional arrays equal', () => {
    const a = [[1, 2], 'foo', [42]]
    expect(equal(a, a)).toBe(true)
  })
})
