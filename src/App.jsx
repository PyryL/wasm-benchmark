import { useState } from 'react'

const App = () => {
  const [jsResult, setJsResult] = useState(null)
  const [rustResult, setRustResult] = useState(null)

  const testFactorial = () => {
    const worker = new Worker('workers/fibonacci-js.js')
    worker.onmessage = event => {
      setJsResult(new Date() - t0)
      if (event.data.payload !== 102334155) {
        console.error('incorrect result from js', event.data.payload)
      }
    }
    const t0 = new Date()
    worker.postMessage({ })

    const rustWorker = new Worker('workers/fibonacci-rust.js')
    rustWorker.onmessage = event => {
      setRustResult(new Date() - t2)
      if (event.data.payload !== 102334155n) {
        console.error('incorrect result from rust', event.data.payload)
      }
    }
    rustWorker.onerror = err => {
      console.error(err)
    }
    const t2 = new Date()
    rustWorker.postMessage({ })
  }

  return (
    <div>
      <button onClick={testFactorial}>Run benchmark</button>
      <p>Javascript result: {jsResult ?? '-'} ms</p>
      <p>Rust WebAssembly result: {rustResult ?? '-'} ms</p>
    </div>
  )
}

export default App
