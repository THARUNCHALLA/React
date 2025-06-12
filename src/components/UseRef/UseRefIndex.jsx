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
