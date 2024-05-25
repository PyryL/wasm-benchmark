import { useState } from 'react'
import { Title, Paper, Button, Loader, Text, ActionIcon, useMantineTheme } from '@mantine/core'
import { IconPlayerPlay, IconInfoCircle, IconInfoCircleFilled } from '@tabler/icons-react'
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

const DescriptionButton = ({ descriptionState }) => {
  const [showDescription, setShowDescription] = descriptionState

  const Icon = props => showDescription ?
    <IconInfoCircleFilled {...props} /> :
    <IconInfoCircle {...props} />

  return (
    <ActionIcon
      variant='subtle'
      aria-label='Show description'
      onClick={() => setShowDescription(!showDescription)}
    >
      <Icon style={{ width: '70%', height: '70%' }} />
    </ActionIcon>
  )
}

const TestItem = ({ title, testWorkerName, expectedResult, description }) => {
  const theme = useMantineTheme()
  const [showDescription, setShowDescription] = useState(false)

  // null when not started, -1 when running, >0 when finished, undefined when failed
  const [jsResult, setJsResult] = useState(null)
  const [rustResult, setRustResult] = useState(null)

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
  const isFinished = (jsResult > 0 || jsResult === undefined) &&
    (rustResult > 0 || rustResult === undefined)

  const paperShadow = {
    boxShadow: `0 1px 3px ${theme.colors[theme.primaryColor][9]}46`,
  }

  const runButtonText = isFinished ? 'Rerun' : isRunning ? 'Running...' : 'Run benchmark'

  const showBarChart = (isRunning || isFinished) && !showDescription

  return (
    <Paper radius='md' withBorder p='xl' style={{ ...paperShadow, ...styles.testItem }}>
      <div style={styles.flexRow}>
        <div style={styles.flexRowLeft}>
          <Title order={2} size='h4'>{title}</Title>
          {isFinished &&
            <DescriptionButton descriptionState={[showDescription, setShowDescription]} />
          }
        </div>
        <Button
          onClick={startTests}
          data-testid={`${testWorkerName}-run-btn`}
          disabled={isRunning}
          leftSection={isRunning ? <Loader size='1.2rem' /> : <IconPlayerPlay size='1.2rem' />}
        >
          {runButtonText}
        </Button>
      </div>
      <div style={styles.zstackContainer}>
        {showBarChart &&
          <BarChart
            testName={testWorkerName} style={styles.zstackItem}
            jsResult={jsResult} rustResult={rustResult}
          />
        }
        {!showBarChart &&
          <TestDescription description={description} style={styles.zstackItem} />
        }
      </div>
    </Paper>
  )
}

TestItem.propTypes = {
  title: PropTypes.string.isRequired,
  testWorkerName: PropTypes.string.isRequired,
  expectedResult: PropTypes.any.isRequired,
  description: PropTypes.string.isRequired,
}

TestDescription.propTypes = {
  description: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
}

DescriptionButton.propTypes = {
  descriptionState: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func,
    ])
  ).isRequired,
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
