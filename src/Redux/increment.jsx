import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {increment,decrement} from "./actioncreator"
const Counter = () => {
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h2 className="text-4xl font-bold text-gray-800 mb-6">Counter: {count}</h2>
      <div className="space-x-1">
        <button
          onClick={() => dispatch(increment())}
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Increment
        </button>
        <button
          onClick={() => dispatch(decrement())}
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Counter;
