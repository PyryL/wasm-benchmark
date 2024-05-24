import { useState } from 'react'
import { Title, Paper, Button, Loader, Text, ActionIcon } from '@mantine/core'
import { IconPlayerPlay, IconInfoCircle } from '@tabler/icons-react'
import BarChart from './BarChart'
import PropTypes from 'prop-types'
import runTest from '../services/runTest'

const TestDescription = ({ description, style }) => {
  /** @type {React.CSSProperties} */
  const descriptionStyle = {
    padding: 10,
    boxSizing: 'content-box',
    width: 'fit-content',
    height: 'fit-content',
    maxWidth: '100%',
    maxHeight: '100%',
    overflow: 'hidden',
    textAlign: 'justify',
  }

  return (
    <Text style={{ ...style, ...descriptionStyle }} size='sm'>{description}</Text>
  )
}

const TestItem = ({ title, testWorkerName, expectedResult, description }) => {
  // null when not started, -1 when running, >0 when finished, undefined when failed
  const [jsResult, setJsResult] = useState(null)
  const [rustResult, setRustResult] = useState(null)
  const [showDescription, setShowDescription] = useState(false)

  const startTests = async () => {
    setJsResult(-1)
    setRustResult(null)
    await handleTest('js', setJsResult)
    setRustResult(-1)
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

  const isRunning = jsResult === -1 || rustResult === -1
  const isFinished = (jsResult > 0 || jsResult === undefined) && (rustResult > 0 || rustResult === undefined)

  return (
    <Paper shadow='sm' radius='md' withBorder p='xl' style={styles.testItem}>
      <div style={styles.flexRow}>
        <div style={styles.flexRowLeft}>
          <Title order={2} size='h4'>{title}</Title>
          {isFinished && <ActionIcon variant={showDescription ? 'filled' : 'outline'}
            aria-label='Show description' onClick={() => setShowDescription(!showDescription)}>
            <IconInfoCircle style={{ width: '70%', height: '70%' }} />
          </ActionIcon>}
        </div>
        <Button onClick={startTests}
          data-testid={`${testWorkerName}-run-btn`}
          disabled={isRunning}
          leftSection={isRunning ? <Loader size='1.2rem' /> : <IconPlayerPlay size={'1.2rem'} />}
        >
          {isFinished ? 'Rerun' : isRunning ? 'Running...' : 'Run benchmark'}
        </Button>
      </div>
      <div style={styles.zstackContainer} className='zstacker'>
        {(isRunning || isFinished) && !showDescription && <BarChart jsResult={jsResult} rustResult={rustResult} style={styles.zstackItem} />}
        {((!isRunning && !isFinished) || showDescription) && <TestDescription description={description} style={styles.zstackItem} />}
      </div>
    </Paper>
  )
}

TestItem.propTypes = {
  title: PropTypes.string.isRequired,
  testWorkerName: PropTypes.string.isRequired,
  expectedResult: PropTypes.any.isRequired,
}

/** @type {Object.<string, React.CSSProperties>} */
const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 10,
  },
  flexRowLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    columnGap: 10,
  },
  testItem: {
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
  },
  zstackContainer: {
    marginTop: 16,
    position: 'relative',
    width: '100%',
    height: 100,
  },
  zstackItem: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto auto',
  },
}

export default TestItem
