import { useEffect, useRef, useState } from 'react'
// import rustLogo from '../assets/rust.svg'
// import jsLogo from '../assets/js.jpg'

const BAR_ANIMATION_FPS = 30

const useElementWidth = () => {
  const ref = useRef(null)
  const [width, setWidth] = useState(0)

  const startObserving = () => {
    const targetElem = ref.current
    if (!targetElem) return
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
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

const BarChart = ({ jsResult, rustResult, style }) => {
  const [containerRef, containerWidth] = useElementWidth()
  const [jsWidth, setJsWidth] = useState(0)
  const [rustWidth, setRustWidth] = useState(0)

  const [refreshCounter, setRefreshCounter] = useState(0)
  const [jsRunStartDate, setJsRunStartDate] = useState(null)
  const [rustRunStartDate, setRustRunStartDate] = useState(null)
  const [animationInterval, setAnimationInterval] = useState(null)

  const updateBarWidths = () => {
    const baseScale = 0.2 // px / millisecond

    const jsValue = (jsResult > 0) ? jsResult : jsRunStartDate ? (new Date() - jsRunStartDate) : 0
    const rustValue = (rustResult > 0) ? rustResult : rustRunStartDate ? (new Date() - rustRunStartDate) : 0

    const maxValue = Math.max(jsValue, rustValue)
    const downscale = maxValue === 0 ? 0 : Math.min(1, containerWidth / (baseScale * maxValue))
  
    setJsWidth(downscale * baseScale * jsValue)
    setRustWidth(downscale * baseScale * rustValue)
  }

  useEffect(updateBarWidths, [containerWidth, jsResult, rustResult, jsRunStartDate, rustRunStartDate, refreshCounter])

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
  }, [jsRunStartDate, rustRunStartDate])

  const jsStyle = {
    ...styles.bar,
    backgroundColor: '#f0db4e',
    color: '#000000',
    width: jsWidth,
  }
  const rustStyle = {
    ...styles.bar,
    backgroundColor: '#7d492b',
    color: '#ffffff',
    width: rustWidth,
  }

  const jsText = (jsResult > 0) ? `${jsResult.toFixed(0)} ms` : ''
  const rustText = (rustResult > 0) ? `${rustResult.toFixed(0)} ms` : ''

  return (
    <div style={{ ...style, ...styles.container }} ref={containerRef}>
      <div style={jsStyle}>
        <span style={styles.resultLabel}>{jsText}</span>
      </div>
      <div style={rustStyle}>
        <span style={{ ...styles.resultLabel, color: 'white' }}>{rustText}</span>
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
}

export default BarChart
