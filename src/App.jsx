import { useState } from 'react'
import runTest from './services/runTest'

const App = () => {
  const [jsResult, setJsResult] = useState('-')
  const [rustResult, setRustResult] = useState('-')

  const testFactorial = async () => {
    setJsResult('...')
    setRustResult('...')

    try {
      const time = await runTest('workers/fibonacci-js.js', 102334155)
      setJsResult(`${time} ms`)
    } catch {
      setJsResult('failed')
    }

    try {
      const time = await runTest('workers/fibonacci-rust.js', 102334155n)
      setRustResult(`${time} ms`)
    } catch {
      setRustResult('failed')
    }
  }

  return (
    <div>
      <button onClick={testFactorial}>Run benchmark</button>
      <p>Javascript result: {jsResult}</p>
      <p>Rust WebAssembly result: {rustResult}</p>
    </div>
  )
}

export default App
