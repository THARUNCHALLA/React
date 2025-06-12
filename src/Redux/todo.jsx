import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {DeleteTodo,ToggleTODO} from "./actioncreator"

const Todo = () => {
    const users = useSelector((state) => state.todos);
    const dispatch = useDispatch()
    const Toggle = (ID) => {
        dispatch(ToggleTODO(ID))
    }

    const Delete = (Id) => {
        dispatch(DeleteTodo(Id))
    }

    return (
        <ol className="list-decimal list-outside pl-2 marker:text-blue-600 mt-4">
            {users && users.map((each) => (
                <li key={each.id} className="font-serif font-semibold text-base text-gray-800 flex">
                    <span className={`cursor-pointer w-96 ${each.isCompleted ? 'line-through text-gray-500' : 'text-gray-800'
                        }`} onClick={() => Toggle(each.id)}>{each.Name}</span>
                    <button className="ml-4 text-red-500 hover:text-red-700 cursor-pointer" onClick={() => Delete(each.id)}>Delete</button>
                </li>
            ))}
        </ol>
    );
};

export default React.memo(Todo);
