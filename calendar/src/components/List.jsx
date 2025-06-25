import "../styles/List.css";
import { useNavigate } from "react-router-dom";

const List = ({ todo }) => {
    const nav = useNavigate();

    return (
        <div className="todo-list">
            <input type="checkBox" />
            <div className="todo-text">{todo.content}</div>
            <div className="button-container">
                <button onClick={() => nav("/add")}>수정</button>
                <button>삭제</button>
            </div>
        </div>
    );
};

export default List;
