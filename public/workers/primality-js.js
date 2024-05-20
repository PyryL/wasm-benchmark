
self.onmessage = () => {
  const t0 = performance.now()
  const result = nthPrime(10000)
  const t1 = performance.now()

  self.postMessage({
    result,
    time: t1 - t0,
  })
}

/**
 * @param {number} n 
 * @returns {number} The `n`th prime number, e.g. 5 for `n=3`.
 */
export const nthPrime = n => {
  let num = 1, primeCount = 0
  while (primeCount < n) {
    if (isPrime(num, 512)) primeCount += 1
    num += 1
  }
  return num - 1
}

/**
 * @param {number} n The number to test.
 * @param {number} k Number that determines the test accuracy. Higher value means more accurate.
 * @returns {boolean} Whether `n` is (likely) a prime.
 */
export const isPrime = (n, k) => {
  if (n <= 1 || n === 4) return false
  if (n === 2 || n === 3) return true
  if (n % 2 === 0) return false

  let d = n - 1
  while (d % 2 === 0) d /= 2

  for (let i=0; i<k; i++) {
    if (!millerTest(d, n)) return false
  }

  return true
}

/**
 * @param {number} d The product of the factors of `n-1` without the factor 2.
 * @param {number} n The number to test.
 * @returns {boolean} Whether `n` seems like a prime.
 */
const millerTest = (d, n) => {
  const a = Math.floor(Math.random() * (n - 4)) + 2 // in range [2, n-2]

  let x = modPow(a, d, n)

  if (x === 1 || x === n-1) return true

  let dCopy = d
  while (dCopy !== n-1) {
    x = (x * x) % n
    dCopy *= 2
    if (x === 1) return false
    if (x === n-1) return true
  }

  return false
}

/**
 * @param {number} base 
 * @param {number} exp 
 * @param {number} mod 
 * @returns {number} `base` raised to the power of `exp` in modulo `mod`.
 */
const modPow = (base, exp, mod) => {
  let result = 1

  base = base % mod

  while (exp > 0) {
    if (exp % 2 === 1) result = (result * base) % mod
    exp = Math.floor(exp / 2)
    base = (base * base) % mod
  }

  return result
}
