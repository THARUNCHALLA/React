import { useReducer, useState } from 'react'
import reducer from './Reducer'
const initialTodos = [
    { id: 1, title: 'Learn React', completed: false },
    { id: 2, title: 'Build a Todo App', completed: false },
];
const UseReducerFunction = () => {
    const [state, dispatch] = useReducer(reducer, initialTodos)
    const [text, setText] = useState("")
    const Delete = (id) => {
        dispatch({ type: "Delete", payload: { id } });
    };

    const togle = (id) => {
        dispatch({ type: "Toggle", payload: { id } });
    };

    const handleAdd = () => {
        const trimmedText = text.trim();
        if (trimmedText) {
            dispatch({
                type: "Add",
                payload: { id: Date.now(), title: trimmedText, completed: false },
            });
            setText("");
        }
    };

    return (
        <div>
            <input type="text" placeholder='Enter SomeThing' value={text} onChange={(e) => (setText(e.target.value))} />
            <button onClick={handleAdd}>Add</button>
            <ul>
                {state.map((todo) => (
                    <li key={todo.id} className='flex'>
                        <p onClick={() => togle(todo.id)} style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}>{todo.title}</p>
                        <button onClick={() => Delete(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>


        </div>
    )
}

export default UseReducerFunction
