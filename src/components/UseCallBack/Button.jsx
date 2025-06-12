import React from 'react'

const Button = ({children,Text,onIncrementSalary}) => {
  console.log(Text,"Button")  
  return (
    <div>
      <button onClick={onIncrementSalary}>{children}</button>
    </div>
  )
}

export default React.memo(Button)
