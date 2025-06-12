import { useCallback, useState } from 'react'
import Count from "./Count"
import Button from './Button'
const Title = () => {
  const [age, setage] = useState(10)
  const [Salary, setSalary] = useState(10000)
  console.log("Title")
  const Increment = useCallback(() => {
    setSalary(Salary + 1000)
  }, [Salary])
  const Age = useCallback(() => {
    setage(prev => prev + 10)
  }, [age])

// useMemo is meant to return a value, not to perform side effects like setage(...).
// So here, you're calling setage() during render, which is not allowed in React.
// This causes infinite re-renders, hence the page crash.
  return (
    <div>
      <p>UseCallBack and React Memo</p>
      <Count Text={"age"} number={age} />
      <Button Text="Age" onIncrementSalary={Age}>Increment Age</Button>
      <Count Text={"Salary"} number={Salary} />
      <Button Text="Salary" onIncrementSalary={Increment}>Increment Salary</Button>
    </div>
  )
}

export default Title
