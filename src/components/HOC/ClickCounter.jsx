import HigherOrder from "./HigherOrder"

const ClickCounter = (props) => {
    return (
        <div>
            <button onClick={props.increment}>{props.Name} Counter Clicked {props.count} Times</button>
        </div>
    )
}

export default HigherOrder(ClickCounter,10)
