import { useState } from 'react'
import runTest from '../services/runTest'

const TestItem = ({ testWorkerName, expectedResult }) => {
  const [jsResult, setJsResult] = useState('-')
  const [rustResult, setRustResult] = useState('-')

  const startTests = async () => {
    setJsResult('...')
    setRustResult('...')
    await handleTest('js', setJsResult)
    await handleTest('rust', setRustResult)
  }

  const handleTest = async (lang, resultSetter) => {
    try {
      const path = `workers/${testWorkerName}-${lang}.js`
      const time = await runTest(path, expectedResult)
      resultSetter(`${time} ms`)
    } catch {
      resultSetter('failed')
    }
  }

  return (
    <div>
      <button onClick={startTests}>Run benchmark</button>
      <p>Javascript result: {jsResult}</p>
      <p>Rust WebAssembly result: {rustResult}</p>
    </div>
  )
}

export default TestItem
