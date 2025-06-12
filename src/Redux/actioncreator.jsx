// counterActions.js
import { INCREMENT, DECREMENT, ADD_TODO,Toggle,DELETE_TODO } from "./actionTypes"

export const increment = () => ({
    type: INCREMENT,
});

export const decrement = () => ({
    type: DECREMENT,
});
export const AddTodo = (todo) => (
    {
        type: ADD_TODO,
        payload: todo
    }
)

export const DeleteTodo = (ID) =>(
    {
        type:DELETE_TODO,
        payload:ID
    }
)

export const ToggleTODO = (ID) =>(
    {
        type:Toggle,
        payload:ID
    }
)