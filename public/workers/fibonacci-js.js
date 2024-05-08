
self.onmessage = () => {
  const t0 = performance.now()
  const result = fibonacci(40)
  const t1 = performance.now()
  self.postMessage({
    result,
    time: t1 - t0,
  })
}

/**
 * Recursively calculate the nth item of the Fibonacci sequence.
 * With `n=0` this returns 0.
 * @param {number} n May not be greather than 78.
 * @returns {number}
 */
const fibonacci = n => {
  if (n > 78) {
    throw new Error('too large input for fibonacci')
  }
  if (n <= 1) {
    return n
  }
  return fibonacci(n - 1) + fibonacci(n - 2)
}
