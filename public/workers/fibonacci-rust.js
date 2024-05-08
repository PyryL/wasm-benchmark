import init, { fibonacci } from '../modules/rust_lib.js'

self.onmessage = async () => {
  await init()

  const t0 = performance.now()
  const result = fibonacci(40)
  const t1 = performance.now()
  self.postMessage({
    result,
    time: t1 - t0,
  })
}
