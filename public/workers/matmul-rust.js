import init, { Matrix } from '../modules/rust_lib.js'

self.onmessage = async () => {
  await init()

  const size = 700
  const A = new Matrix(), B = new Matrix()
  for (let i=0; i<size; i++) {
    const ARow = [], BRow = []
    for (let j=0; j<size; j++) {
      ARow[j] = BigInt((i+1)*(j+1))
      BRow[j] = BigInt(i+j+1)
    }
    A.add_row(ARow)
    B.add_row(BRow)
  }

  const t0 = performance.now()
  const result = A.multiply(B, size)
  const t1 = performance.now()

  const resultData = []
  for (let i=0; i<size; i++) {
    resultData[i] = []
    for (const item of result.get_row(i)) {
      resultData[i].push(Number(item))
    }
  }

  self.postMessage({
    result: resultData,
    time: t1 - t0,
  })
}
