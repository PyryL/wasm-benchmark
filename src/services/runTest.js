
/**
 * Whether the two arguments equal directly or as arrays.
 */
const equal = (a, b) => {
  if (a === b) return true
  if (!Array.isArray(a) || !Array.isArray(b)) return false
  if (a.length !== b.length) return false

  for (let i=0; i<a.length; i++) {
    if (!equal(a[i], b[i])) return false
  }
  return true
}

const runTest = async (workerPath, expectedResult) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(workerPath, { type: 'module' })

    worker.onmessage = event => {
      if (equal(event.data.result, expectedResult)) {
        resolve(event.data.time)
      } else {
        console.error(`incorrect result from ${workerPath} in ${event.data.time} ms`, event.data.result)
        reject()
      }
    }
  
    worker.onerror = err => {
      console.error(`worker ${workerPath} errored`, err)
      reject()
    }

    worker.postMessage({ })
  })
}

export default runTest
