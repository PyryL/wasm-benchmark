import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import BarChart from './BarChart'
import PropTypes from 'prop-types'
import runTest from '../services/runTest'

const TestItem = ({ title, testWorkerName, expectedResult }) => {
  // null when not started, -1 when running, >0 when finished, undefined when failed
  const [jsResult, setJsResult] = useState(null)
  const [rustResult, setRustResult] = useState(null)

  const startTests = async () => {
    setJsResult(-1)
    setRustResult(-1)
    await handleTest('js', setJsResult)
    await handleTest('rust', setRustResult)
  }

  const handleTest = async (lang, resultSetter) => {
    try {
      const path = `workers/${testWorkerName}-${lang}.js`
      const time = await runTest(path, expectedResult)
      resultSetter(time)
    } catch {
      resultSetter(undefined)
    }
  }

  /** @type {React.CSSProperties} */
  const testItemStyle = {
    width: '100%',
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderStyle: 'solid',
    borderRadius: 5,
  }

  /** @type {React.CSSProperties} */
  const flexRow = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

  const isRunning = jsResult === -1 || rustResult === -1
  const isFinished = (jsResult > 0 || jsResult === undefined) && (rustResult > 0 || rustResult === undefined)

  return (
    <div style={testItemStyle}>
      <div style={flexRow}>
        <h3>{title}</h3>
        <Button onClick={startTests} data-testid={`${testWorkerName}-run-btn`} disabled={isRunning}>
          {isFinished ? 'Rerun' : isRunning ? 'Running...' : 'Run benchmark'}
        </Button>
      </div>
      <BarChart jsResult={jsResult} rustResult={rustResult} />
    </div>
  )
}

TestItem.propTypes = {
  title: PropTypes.string.isRequired,
  testWorkerName: PropTypes.string.isRequired,
  expectedResult: PropTypes.any.isRequired,
}

export default TestItem
