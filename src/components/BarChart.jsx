import { useEffect, useRef, useState } from 'react'
// import rustLogo from '../assets/rust.svg'
// import jsLogo from '../assets/js.jpg'

const useElementWidth = () => {
  const ref = useRef(null)
  const [width, setWidth] = useState(0)

  const startObserving = () => {
    if (!ref.current) return
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.target === ref.current) setWidth(entry.contentRect.width)
      }
    })
    observer.observe(ref.current)
    setWidth(ref.current.offsetWidth)
    return () => {
      observer.unobserve(ref.current)
      observer.disconnect()
    }
  }

  useEffect(startObserving, [ref])

  return [
    ref,
    width,
  ]
}

const BarChart = ({ jsResult, rustResult }) => {
  const [containerRef, containerWidth] = useElementWidth()
  const [jsWidth, setJsWidth] = useState(0)
  const [rustWidth, setRustWidth] = useState(0)

  const updateBarWidths = () => {
    const baseScale = 0.2 // px / millisecond

    const jsValue = (jsResult > 0) ? jsResult : 0
    const rustValue = (rustResult > 0) ? rustResult : 0

    const maxValue = Math.max(jsValue, rustValue)
    const downscale = maxValue === 0 ? 0 : Math.min(1, containerWidth / (baseScale * maxValue))
  
    setJsWidth(downscale * baseScale * jsValue)
    setRustWidth(downscale * baseScale * rustValue)
  }

  useEffect(updateBarWidths, [containerWidth, jsResult, rustResult])

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
    <div style={styles.container} ref={containerRef}>
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
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',        // VStack
    alignItems: 'flex-start',       // horizontal align
    marginTop: 5,
    marginBottom: 5,
  },
  bar: {
    height: 30,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 6,
    position: 'relative',
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
