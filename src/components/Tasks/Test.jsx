import React, { useRef, useState, useEffect } from "react";
import '../../styles/Test.css';

export default function Test() {

    const inputRef = useRef(null);
    const focusInput = () => {
        inputRef.current.focus(); // Truy cập DOM element và focus
    };

    let a = 10;
    let b = 3;
    let c = a % b;
    let d = (a - c) / b;
    let e = (a + b - c) / b;

    const countRef = useRef(0);
    const increment = () => {
        countRef.current += 1;
        // console.log("Giá trị hiện tại:", countRef.current);
    };
    const [countState, setCountState] = useState(0);
    const incrementState = () => setCountState(countState + 1);

    const [countEffect, setCountEffect] = useState(0);
    useEffect(() => {
        console.log("Giá trị count thay đổi:", countEffect);
    }, [countEffect]);

    

    return (
        <div className="math-demo-container">
            <div className="math-results">
                <h1>Chia lấy dư: {a} % {b} = {c}</h1>
                <h1>Làm tròn xuống: {d} = lấy phần nguyên</h1>
                <h1>Làm tròn lên: {e}</h1>
            </div>

            <div className="input-section">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Nhập gì đó..."
                    className="styled-input"
                />
                <button onClick={focusInput} className="styled-btn">Focus ô nhập</button>
            </div>

            <div className="counter-section">
                <p>Giá trị countRef: <span className="highlight">{countRef.current}</span></p>
                <button onClick={increment} className="styled-btn">countRef</button>
                <br />
                <p>Giá trị countState: <span className="highlight">{countState}</span></p>
                <button onClick={incrementState} className="styled-btn">countState</button>
            </div>

            <div>
                <p>Giá trị countEffect: <span className="highlight">{countEffect}</span></p>
                <button onClick={() => {setCountEffect(countEffect + 1)}} className="styled-btn">countEffect</button>
            </div>
        </div>
    )
}
