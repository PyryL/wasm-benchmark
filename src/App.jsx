import TestItem from "./components/TestItem"
import matrixMultiplicationResult from './constants/matrix-multiplication-result'

const App = () => {
  const tests = [
    {
      name: 'fibonacci',
      result: 102334155,
    },
    {
      name: 'matrix-multiplication',
      result: matrixMultiplicationResult,
    },
  ]

  return (
    <div>
      {tests.map(test =>
        <TestItem key={test.name}
          testWorkerName={test.name} expectedResult={test.result}
        />
      )}
    </div>
  )
}

export default App
