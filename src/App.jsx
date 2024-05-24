import { Title } from '@mantine/core';
import TestItem from './components/TestItem'
import matmulResult from './constants/matmul-result'
import Footer from './components/Footer'

const App = () => {
  const tests = [
    {
      title: 'Fibonacci sequence',
      name: 'fibonacci',
      result: 102334155,
      description: 'This benchmark measures the performance of recursion and function call overhead by calculating the 40th Fibonacci number using a naive recursive approach without caching.',
    },
    {
      title: 'Matrix multiplication',
      name: 'matmul',
      result: matmulResult,
      description: 'This benchmark evaluates the efficiency in handling large-scale numerical computations and memory operations by performing the multiplication of two 700\u{00d7}700 matrices using a triple nested loop approach.',
    },
    {
      title: 'Primality test',
      name: 'primality',
      result: 104729,
      description: 'Find the 10,000th prime number by applying the probabilistic Miller-Rabin primality test to each successive number individually. Benchmarks handling of large integers and random number generation.',
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
            <TestItem key={test.name} title={test.title} description={test.description}
              testWorkerName={test.name} expectedResult={test.result}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
