import TestItem from "./components/TestItem"

const App = () => {
  const tests = [
    {
      name: 'fibonacci',
      result: 102334155,
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
