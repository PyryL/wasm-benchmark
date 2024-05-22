import TestItem from './components/TestItem'
import matmulResult from './constants/matmul-result'

const App = () => {
  const tests = [
    {
      title: '40th Fibonacci',
      name: 'fibonacci',
      result: 102334155,
    },
    {
      title: 'Matrix multiplication',
      name: 'matmul',
      result: matmulResult,
    },
    {
      title: '10000th prime number',
      name: 'primality',
      result: 104729,
    },
  ]

  /** @type {import('react').CSSProperties} */
  const testListStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  }

  return (
    <div style={{ margin: 10 }}>
      <h1>Rust WebAssembly benchmark</h1>
      <div style={testListStyle}>
        {tests.map(test =>
          <TestItem key={test.name} title={test.title}
            testWorkerName={test.name} expectedResult={test.result}
          />
        )}
      </div>
    </div>
  )
}

export default App
