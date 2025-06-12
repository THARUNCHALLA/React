import {useState } from 'react'

const useCustom = (initialState = 0) => {
    const [count, setCount] = useState(initialState)
    const Increment = () => {
        setCount(prev => prev + 1)
    }
    const Decrement = () => {
        setCount(prev => prev - 1)
    }
    const Reset = () => {
        setCount(initialState)
    }

    return [count, Increment, Decrement, Reset]
}

export default useCustom
