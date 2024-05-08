
const runTest = async (workerPath, expectedResult) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(workerPath, { type: 'module' })

    worker.onmessage = event => {
      if (event.data.result === expectedResult) {
        resolve(event.data.time)
      } else {
        console.error(`incorrect result from ${workerPath}`, event.data.result)
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
