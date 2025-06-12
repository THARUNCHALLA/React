import React, { useState } from 'react';

const Counter = () => {
  const [value, setValue] = useState(0);

  const handleIncrement = () => setValue(prev => prev + 1);
  const handleDecrement = () => setValue(prev => prev - 1);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <p className="text-2xl font-bold mb-6">Count: {value}</p>
      <div className="flex gap-4">
        <button
          className="focus:outline-none focus:ring-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
          onClick={handleIncrement}
        >
          Increment
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md shadow-xl shadow-sky-50 transition duration-300 ease-in-out focus:outline focus:ring-2 focus:ring-blue-800 focus:ring-offset-2"
          onClick={handleDecrement}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Counter;
