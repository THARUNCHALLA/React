import React, { useState } from 'react'

const UseState = () => {
    const [count, setData] = useState(0)
    return (
        <div>
            <button onClick={() => setData(count + 1)}>+</button>
            <p>Count : {count}</p>
        </div>
    )
}

export default UseState
