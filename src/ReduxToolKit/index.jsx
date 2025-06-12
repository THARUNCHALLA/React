import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from "./store"
import TodoReduxToolKit from "./todo"
import CounterReduxToolKit from './counter';
import TodoList from './Todolist';
import Data from './data';
const ReduxToolKitExample = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        Name: "",
        id: "",
        isCompleted: false
    });

    const ADD = () => {
        if (user.Name.trim()) {
            dispatch(addTodo(user))
            setUser({
                Name: "",
                id: "",
                isCompleted: false
            })
        }
    };



    return (
        <>
            {/* <CounterReduxToolKit />
            <input
                className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Username"
                value={user.Name}
                onChange={(e) =>
                    setUser({
                        ...user,
                        Name: e.target.value,
                        id: Date.now().toString(),
                        isCompleted: false
                    })
                }
            />
            <button
                type="button"
                onClick={ADD}
                className="border-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-md font-semibold"
            >
                ADD
            </button>
            <TodoReduxToolKit /> */}
            {/* <TodoList/> */}
            <Data />
        </>
    );
};

export default ReduxToolKitExample;
