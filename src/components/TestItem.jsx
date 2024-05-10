import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import PropTypes from 'prop-types'
import runTest from '../services/runTest'

const Result = ({ result }) => {
  if (result === 'loading') {
    return <Spinner animation='border'>
      <span className='visually-hidden'>Running...</span>
    </Spinner>
  }

  return <span>{result}</span>
}

const TestItem = ({ title, testWorkerName, expectedResult }) => {
  const [jsResult, setJsResult] = useState('-')
  const [rustResult, setRustResult] = useState('-')

  const startTests = async () => {
    setJsResult('loading')
    setRustResult('loading')
    await handleTest('js', setJsResult)
    await handleTest('rust', setRustResult)
  }

  const handleTest = async (lang, resultSetter) => {
    try {
      const path = `workers/${testWorkerName}-${lang}.js`
      const time = await runTest(path, expectedResult)
      resultSetter(`${time.toFixed(0)} ms`)
    } catch {
      resultSetter('failed')
    }
  }

  /** @type {React.CSSProperties} */
  const alignCenter = {
    textAlign: 'center',
  }

  return (
    <tr>
      <td>{title}</td>
      <td style={alignCenter} data-testid={`${testWorkerName}-js-cell`}><Result result={jsResult} /></td>
      <td style={alignCenter} data-testid={`${testWorkerName}-rust-cell`}><Result result={rustResult} /></td>
      <td style={alignCenter}><Button onClick={startTests} data-testid={`${testWorkerName}-run-btn`}>Run benchmark</Button></td>
    </tr>
  )
}

Result.propTypes = {
  result: PropTypes.string.isRequired,
}

TestItem.propTypes = {
  title: PropTypes.string.isRequired,
  testWorkerName: PropTypes.string.isRequired,
  expectedResult: PropTypes.any.isRequired,
}

export default TestItem
