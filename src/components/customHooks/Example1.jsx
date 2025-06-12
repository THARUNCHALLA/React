import { useState } from 'react'
import useCustom from './Common'
const Custom = () => {
    const [count, Increment, Decrement, Reset] = useCustom(10)
    return (
        <div>
            <p>Count : {count}</p>
            <button onClick={Increment}>Increment</button>
            <button onClick={Decrement}>Decrement</button>
            <button onClick={Reset}>Reset</button>
        </div>
    )
}

export default Custom
