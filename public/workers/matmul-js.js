
self.onmessage = () => {
  const size = 700
  const A = [], B = []
  for (let i=0; i<size; i++) {
    A[i] = []
    B[i] = []
    for (let j=0; j<size; j++) {
      A[i][j] = (i+1)*(j+1)
      B[i][j] = i+j+1
    }
  }

  const t0 = performance.now()
  const result = matrixMultiplication(A, B, size)
  const t1 = performance.now()
  self.postMessage({
    result,
    time: t1 - t0,
  })
}

const matrixMultiplication = (A, B, size) => {
  const C = []
  for (let i=0; i<size; i++) {
    C[i] = []
    for (let j=0; j<size; j++) {
      C[i][j] = 0
      for (let k=0; k<size; k++) {
        C[i][j] += A[i][k] * B[k][j]
      }
    }
  }
  return C
}
