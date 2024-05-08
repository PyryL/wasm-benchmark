
self.onmessage = () => {
  const result = fibonacci(40)
  self.postMessage({ payload: result })
}

const fibonacci = n => {
  if (n <= 1) {
    return n
  }
  return fibonacci(n - 1) + fibonacci(n - 2)
}
