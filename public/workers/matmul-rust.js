import init, { Matrix } from '../modules/rust_lib.js'

self.onmessage = async () => {
  await init()

  const size = 700
  let A = new Matrix(), B = new Matrix()
  for (let i=0; i<size; i++) {
    let A_row = [], B_row = []
    for (let j=0; j<size; j++) {
      A_row[j] = BigInt((i+1)*(j+1))
      B_row[j] = BigInt(i+j+1)
    }
    A.add_row(A_row)
    B.add_row(B_row)
  }

  const t0 = performance.now()
  const result = A.multiply(B, size)
  const t1 = performance.now()

  let resultData = []
  for (let i=0; i<size; i++) {
    resultData[i] = []
    for (let item of result.get_row(i)) {
      resultData[i].push(Number(item))
    }
  }

  self.postMessage({
    result: resultData,
    time: t1 - t0,
  })
}
