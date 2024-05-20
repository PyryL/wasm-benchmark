import { isPrime, nthPrime } from "../public/workers/primality-js";

describe('primality', () => {
  test('a small number is a prime', () => {
    expect(isPrime(7919, 128)).toBe(true)
  })

  test('a large number is a prime', () => {
    expect(isPrime(39916801, 128)).toBe(true)
  })

  test('a huge even number is not a prime', () => {
    expect(isPrime(2387247226, 128)).toBe(false)
  })

  test('small corner cases are handled', () => {
    expect(isPrime(1, 128)).toBe(false)
    expect(isPrime(2, 128)).toBe(true)
    expect(isPrime(3, 128)).toBe(true)
    expect(isPrime(4, 128)).toBe(false)
    expect(isPrime(5, 128)).toBe(true)
  })

  test('finding nth prime works', () => {
    expect(nthPrime(10)).toBe(29)
  })
})
