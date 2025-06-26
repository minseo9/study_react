import "../styles/DeleteModal.css";
import { useContext } from "react";
import { TodoContext } from "../App";

const DeleteModal = ({ isOpen, onClose, selectTodoId }) => {
    const { todo, setTodo } = useContext(TodoContext);

    if (!isOpen) return null;

    const deleteTodo = () => {
        const newTodo = todo.filter((todo) => todo.id !== selectTodoId.current);
        setTodo(newTodo);
    };

    return (
        <div className="delete-modal">
            <div className="modal-text">정말로 삭제하시겠습니까?</div>
            <div className="button-container">
                <button onClick={() => onClose()}>취소</button>
                <button
                    onClick={() => {
                        deleteTodo();
                        onClose();
                    }}
                >
                    삭제
                </button>
            </div>
        </div>
    );
};

export default DeleteModal;
