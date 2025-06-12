import { useState } from "react"

const HigherOrder = (OriginalComponent,Value) => {
    const NewComponent = (props) => {
        const [count, setCount] = useState(0)
        const Handle = () => {
            setCount(count + Value)
        }
        return <OriginalComponent count={count} increment={Handle} {...props}/>
    }
    return NewComponent
}

export default HigherOrder
