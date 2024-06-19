import Module from '../modules/c_lib.js'

self.onmessage = async () => {
  const module = await Module()
  const fibonacci = module.cwrap('fibonacci', 'number', ['number'])

  const t0 = performance.now()
  const result = fibonacci(40)
  const t1 = performance.now()

  self.postMessage({
    result,
    time: t1 - t0,
  })
}
