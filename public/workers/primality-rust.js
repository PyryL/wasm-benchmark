import init, { nth_prime } from '../modules/rust_lib.js'

self.onmessage = async () => {
  await init()

  const t0 = performance.now()
  const result = nth_prime(10000)
  const t1 = performance.now()

  self.postMessage({
    result,
    time: t1 - t0,
  })
}
