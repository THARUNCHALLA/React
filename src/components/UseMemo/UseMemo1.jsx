import React, { useState, useMemo, useEffect } from 'react';

const UseMemo1 = () => {
    const [data, setData] = useState(0);
    const [dark, setDark] = useState(false);

    const handleChange = (e) => {
        const value = Number(e.target.value);
        setData(value);
    };

    const doubleNumber = useMemo(() => {
        return slowFunction(data);
    }, [data]);

    const handleThemeToggle = () => {
        setDark((prevDark) => !prevDark);
    };


    const styleCode = useMemo(() => {
        return {
            color: dark ? 'white' : 'black',
            backgroundColor: dark ? 'black' : 'white',
            padding: '10px',
            borderRadius: '5px'
        }
    }, [dark])


    useEffect(() => {
        console.log("StyleCode updated:", styleCode);
    }, [styleCode]);

    return (
        <div>
            <input
                type="number"
                name="tharun"
                value={data}
                onChange={handleChange}
            />
            <button onClick={handleThemeToggle}>Change Theme</button>
            <p style={styleCode}>The Number: {doubleNumber}</p>
        </div>
    );
};

const slowFunction = (num) => {
    for (let i = 0; i < 10000; i++) { }
    console.log("Computing slow function");
    return num * 2;
};

export default UseMemo1;

// useMemo: Memoizing Values
// The useMemo hook allows you to memoize expensive computations or non-primitive values, ensuring that they're only recalculated when their dependencies change. This is particularly useful for:
// Expensive Calculations: Avoiding recalculations of complex computations on every render.
// Stable References: Preventing unnecessary re-renders by maintaining the same reference for objects or arrays unless their content changes.
// In React, when a component's state or props change, the component re-renders.
// During this process, any objects or arrays defined within the component are recreated,
// resulting in new references. This can cause child components to re-render unnecessarily
// if they're receiving these newly created objects or arrays as props, even if their actual content hasn't changed.




// some times if the component rernder every function is executed some times one function it will take 10 sec ,to avoid execute that dunction in every rerender we use usecallback in 
// which time that function execute that can mention usecllback dependency