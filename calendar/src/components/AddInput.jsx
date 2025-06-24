import "../styles/AddInput.css";
import { useNavigate } from "react-router-dom";

const Input = () => {
    const nav = useNavigate();

    const movingHome = () => {
        nav("/", { replace: true });
    };

    return (
        <div className="add-input">
            <section className="prev-button-container">
                <button onClick={movingHome}>&lt;</button>
            </section>
            <section className="input-container">
                <input type="date" />
                <input type="text" id="todoInput" placeholder="할 일" />
                <textarea
                    name=""
                    id=""
                    cols="50"
                    rows="5"
                    placeholder="메모"
                ></textarea>
            </section>
            <section className="submit-button-container">
                <button onClick={movingHome}>저장</button>
            </section>
        </div>
    );
};

export default Input;
