import { useState } from 'react'

const App = () => {
  const [jsResult, setJsResult] = useState(null)

  const testFactorial = () => {
    const worker = new Worker('workers/fibonacci.js')
    worker.onmessage = event => {
      setJsResult(new Date() - t0)
      if (event.data.payload !== 102334155) {
        console.error('incorrect result from js', event.data.payload)
      }
    }
    const t0 = new Date()
    worker.postMessage({ })

    // TODO: fibonacci with Rust
  }

  return (
    <div>
      <button onClick={testFactorial}>Run benchmark</button>
      <p>Javascript result: {jsResult ?? '-'} ms</p>
      <p>Rust WebAssembly result: -</p>
    </div>
  )
}

export default App
