
self.onmessage = () => {
  const t0 = performance.now()
  const result = fibonacci(40)
  const t1 = performance.now()
  self.postMessage({
    result,
    time: t1 - t0,
  })
}

const fibonacci = n => {
  if (n <= 1) {
    return n
  }
  return fibonacci(n - 1) + fibonacci(n - 2)
}
