import TestItem from "./components/TestItem"
import Table from 'react-bootstrap/Table'
import matrixMultiplicationResult from './constants/matrix-multiplication-result'

const App = () => {
  const tests = [
    {
      title: '40th Fibonacci',
      name: 'fibonacci',
      result: 102334155,
    },
    {
      title: 'Matrix multiplication',
      name: 'matrix-multiplication',
      result: matrixMultiplicationResult,
    },
  ]

  return (
    <div style={{ margin: 10 }}>
      <h1>Rust WebAssembly benchmark</h1>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Test</th>
            <th>Javascript</th>
            <th>Rust</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tests.map(test =>
            <TestItem key={test.name} title={test.title}
              testWorkerName={test.name} expectedResult={test.result}
            />
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default App
