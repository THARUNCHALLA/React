import React from 'react'

const Count = ({Text,number}) => {
  console.log(Text,"Text")
  return (
    <div>
      <p>{Text} : {number}</p>
    </div>
  )
}

export default React.memo(Count)
