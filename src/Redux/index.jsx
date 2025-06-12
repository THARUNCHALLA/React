import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Todo from './todo';
import Counter from "./increment"
import MiddleWare from './middleware';
import { AddTodo } from './actioncreator';

const ReduxExample = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        Name: "",
        id: "",
        isCompleted: false
    });

    const ADD = () => {
        if (user.Name.trim()) {
            dispatch(AddTodo(user))
            setUser({
                Name: "",
                id: "",
                isCompleted: false
            })
        }
    };



    return (
        <>
            <Counter />
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

            <Todo />
            {/* <MiddleWare/> */}

        </>
    );
};

export default ReduxExample;
