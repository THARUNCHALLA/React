import HigherOrder from "./HigherOrder"

const Hover = (props) => {
    return (
        <div>
            <p onMouseEnter={props.increment}>{props.Name} Counter Clicked {props.count} Times</p>
        </div>
    )
}

export default HigherOrder(Hover,5)