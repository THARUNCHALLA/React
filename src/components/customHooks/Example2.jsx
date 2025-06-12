import useCustom from "./Common"

const Example = () => {
  const [count, Increment, Decrement, Reset] = useCustom(100)
    return (
        <div>
            <p>Count : {count}</p>
            <button onClick={Increment}>Increment</button>
            <button onClick={Decrement}>Decrement</button>
            <button onClick={Reset}>Reset</button>
        </div>
    )
}

export default Example
