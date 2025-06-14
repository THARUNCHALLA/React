import React, { useEffect, useRef, useState } from 'react';

const UseRefIndex = () => {
    const [Data, setData] = useState("");
    const countRef = useRef(0);
    const inputRef = useRef(null); // ✅ Declare inputRef

    useEffect(() => {
        countRef.current += 1;
        console.log("Render count:", countRef.current);
    });

    return (
        <div>
            <input
                type='text'
                placeholder='Enter'
                ref={inputRef}
                value={Data}
                onChange={(e) => setData(e.target.value)}
            />
            <p>{Data}</p>
            <p>Rendered Count: {countRef.current}</p>
        </div>
    );
};

export default UseRefIndex;


// What happens when you click Start?
// If intervalRef.current is null (meaning no timer is running), it creates a new timer and saves its ID.

// If intervalRef.current is NOT null (timer already running), it skips creating a new one.

// import { useRef, useState, useEffect } from "react";

// function Test() {
//   const [count, setCount] = useState(1);
//   const intervalRef = useRef(null);

//   // Start the timer once on mount
//   useEffect(() => {
//     startTimer();
//     return () => clearInterval(intervalRef.current);
//   }, []);

//   const startTimer = () => {
//     // Avoid multiple intervals
//     if (intervalRef.current !== null) return;

//     intervalRef.current = setInterval(() => {
//       setCount(prev => prev + 1);
//     }, 1000);
//   };

//   const stopTimer = () => {
//     clearInterval(intervalRef.current);
//     intervalRef.current = null; // clear ref so startTimer can start it again
//   };

//   return (
//     <div>
//       <p>Timer: {count}</p>
//       <button onClick={startTimer}>Start</button>
//       <button onClick={stopTimer}>Stop</button>
//     </div>
//   );
// }

// export default Test;




// The key point:
// useEffect runs after the first render, not during.

// So when the component initially renders:

// renders.current is still 1 (your initial value).

// The DOM is shown before useEffect increments it.

// 🧠 React Render Timeline:
// Component mounts.

// React renders JSX using renders.current = 1.

// Browser displays: Component rendered: 1 times.

// Then useEffect runs and increments renders.current to 2.

// But React does not re-render because useRef changes do not trigger re-render.