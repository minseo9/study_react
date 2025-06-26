import "../styles/MemoModal.css";
import { useContext } from "react";
import { TodoContext } from "../App";

const MemoModal = ({ isOpen, onClose, selectTodoId }) => {
    const { todo } = useContext(TodoContext);

    if (!isOpen) return null;

    const selectTodo = todo.find((todo) => selectTodoId.current === todo.id);
    const memo = selectTodo.memo;

    return (
        <div className="memo-modal">
            <textarea
                readOnly
                className="modal-text"
                value={memo}
                cols="35"
                rows="6"
            ></textarea>
            <div className="button-container">
                <button onClick={() => onClose()}>확인</button>
            </div>
        </div>
    );
};

export default MemoModal;
