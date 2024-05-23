import { Title } from '@mantine/core';
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
    <div style={{ padding: 10 }}>
      <header>
        <Title order={1}>Rust WebAssembly benchmark</Title>
      </header>
      <main>
        <div style={testListStyle}>
          {tests.map(test =>
            <TestItem key={test.name} title={test.title}
              testWorkerName={test.name} expectedResult={test.result}
            />
          )}
        </div>
      </main>
      <footer>
        Copyright &copy; 2024 Pyry Lahtinen
      </footer>
    </div>
  )
}

export default App
