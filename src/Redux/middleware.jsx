import { useSelector, useDispatch } from "react-redux"
import axios from "axios"

const MiddleWare = () => {
    const dispatch = useDispatch()
    const Response1 = useSelector(s => s)
    console.log(Response1, "Response1")
    const fetch = async (dispatch, getstate) => {
        const Response = await axios.get("https://jsonplaceholder.typicode.com/users")
        const Data = Response.data
        dispatch({ type: "add", payload: Data })
    }
    return (
        <div>
            <button onClick={() => dispatch(fetch)}>GET</button>
            <ul>
                {Response1.map(each=>(
                    <li key={each.id}>{each.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default MiddleWare
