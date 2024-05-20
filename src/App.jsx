import TestItem from "./components/TestItem"
import Table from 'react-bootstrap/Table'
import matrixMultiplicationResult from './constants/matrix-multiplication-result'
import jsLogo from './assets/js.jpg'
import rustLogo from './assets/rust.svg'

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
    {
      title: '10000th prime number',
      name: 'primality',
      result: 104729,
    },
  ]

  const alignCenter = {
    textAlign: 'center',
  }

  return (
    <div style={{ margin: 10 }}>
      <h1>Rust WebAssembly benchmark</h1>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Test</th>
            <th style={alignCenter}><img src={jsLogo} height={50} /></th>
            <th style={alignCenter}><img src={rustLogo} height={50} /></th>
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
