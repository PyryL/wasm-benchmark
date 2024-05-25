import { useEffect, useRef, useState } from 'react'
import { useMantineTheme } from '@mantine/core'
import rustLogo from '../assets/rust.svg'
import jsLogo from '../assets/js.svg'
import PropTypes from 'prop-types'

const BAR_ANIMATION_FPS = 30

const useElementWidth = () => {
  const ref = useRef(null)
  const [width, setWidth] = useState(0)

  const startObserving = () => {
    const targetElem = ref.current
    if (!targetElem) return
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.target === targetElem) setWidth(entry.contentRect.width)
      }
    })
    observer.observe(targetElem)
    setWidth(targetElem.offsetWidth)
    return () => {
      observer.unobserve(targetElem)
      observer.disconnect()
    }
  }

  useEffect(startObserving, [ref])

  return [
    ref,
    width,
  ]
}

const BarChart = ({ testName, jsResult, rustResult, style }) => {
  const theme = useMantineTheme()
  const [containerRef, containerWidth] = useElementWidth()
  const [jsWidth, setJsWidth] = useState(0)
  const [rustWidth, setRustWidth] = useState(0)
  const [jsTransition, setJsTransition] = useState(false)
  const [rustTransition, setRustTransition] = useState(false)

  const [refreshCounter, setRefreshCounter] = useState(0)
  const [jsRunStartDate, setJsRunStartDate] = useState(null)
  const [rustRunStartDate, setRustRunStartDate] = useState(null)
  const [animationInterval, setAnimationInterval] = useState(null)

  const updateBarWidths = () => {
    const baseScale = 0.2 // px / millisecond

    const jsValue = (jsResult > 0) ? jsResult :
      jsRunStartDate ? (new Date() - jsRunStartDate) : 0
    const rustValue = (rustResult > 0) ? rustResult :
      rustRunStartDate ? (new Date() - rustRunStartDate) : 0

    const maxValue = Math.max(jsValue, rustValue)
    const downscale = maxValue === 0 ? 0 : Math.min(1, containerWidth / (baseScale * maxValue))

    const newJsWidth = downscale * baseScale * jsValue
    const newRustWidth = downscale * baseScale * rustValue

    setJsTransition(!(jsResult > 0) && newJsWidth > jsWidth)
    setRustTransition(!(rustResult > 0) && newRustWidth > rustWidth)
    setJsWidth(newJsWidth)
    setRustWidth(newRustWidth)
  }

  useEffect(
    updateBarWidths,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [containerWidth, jsResult, rustResult, jsRunStartDate, rustRunStartDate, refreshCounter]
  )

  useEffect(() => {
    if (jsResult === -1 && !jsRunStartDate) {
      setJsRunStartDate(new Date())
    } else if (jsResult !== -1 && jsRunStartDate) {
      setJsRunStartDate(null)
    }

    if (rustResult === -1 && !rustRunStartDate) {
      setRustRunStartDate(new Date())
    } else if (rustResult !== -1 && rustRunStartDate) {
      setRustRunStartDate(null)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jsResult, rustResult])

  useEffect(() => {
    if ((jsRunStartDate !== null || rustRunStartDate !== null) && !animationInterval) {
      const interval = setInterval(() => {
        setRefreshCounter(oldValue => oldValue+1)
      }, 1000/BAR_ANIMATION_FPS)
      setAnimationInterval(interval)
    } else if (jsRunStartDate === null && rustRunStartDate === null) {
      clearInterval(animationInterval)
      setAnimationInterval(null)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jsRunStartDate, rustRunStartDate])

  const jsStyle = {
    ...styles.bar,
    ...(jsTransition ? styles.barTransition : {}),
    backgroundColor: theme.colors.javascript[4],
    width: jsWidth,
  }
  const jsResultLabelStyle = {
    ...styles.resultLabel,
    color: theme.black,
    ...(jsWidth < 90 ? { ...styles.resultLabelOutside, color: theme.white } : {}),
  }
  const rustStyle = {
    ...styles.bar,
    ...(rustTransition ? styles.barTransition : {}),
    backgroundColor: theme.colors.rust[7],
    width: rustWidth,
  }
  const rustResultLabelStyle = {
    ...styles.resultLabel,
    ...(rustWidth < 90 ? styles.resultLabelOutside : {}),
    color: theme.white,
  }

  const jsText = (jsResult > 0) ? `${jsResult.toFixed(0)} ms` : ''
  const rustText = (rustResult > 0) ? `${rustResult.toFixed(0)} ms` : ''

  return (
    <div style={{ ...style, ...styles.container }} ref={containerRef}>
      <div style={jsStyle}>
        {jsWidth > 40 && <img src={jsLogo} style={styles.languageLogo} />}
        <span style={jsResultLabelStyle} data-testid={`${testName}-js`}>{jsText}</span>
      </div>
      <div style={rustStyle}>
        {rustWidth > 40 && <img src={rustLogo} style={styles.languageLogo} />}
        <span style={rustResultLabelStyle} data-testid={`${testName}-rust`}>{rustText}</span>
      </div>
    </div>
  )
}

/** @type {Object.<string, React.CSSProperties>} */
const styles = {
  container: {
    width: '100%',
    height: 'fit-content',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column', // VStack
    alignItems: 'flex-start', // horizontal align
  },
  bar: {
    height: 30,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 6,
    position: 'relative',
  },
  barTransition: {
    transition: `width ${1/BAR_ANIMATION_FPS}s linear`,
  },
  resultLabel: {
    height: 'fit-content',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 5,
    margin: 'auto 0',
    whiteSpace: 'nowrap', // force single line
  },
  resultLabelOutside: {
    right: undefined,
    left: 'calc(100% + 5px)',
  },
  languageLogo: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    padding: 5,
    maxHeight: '100%',
  },
}

BarChart.propTypes = {
  testName: PropTypes.string.isRequired,
  jsResult: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([null, undefined]),
  ]),
  rustResult: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([null, undefined]),
  ]),
  style: PropTypes.object.isRequired,
}

export default BarChart
