import "../styles/List.css";
import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../App";

const List = ({
    selectTodo,
    setDeleteModalOpen,
    setMemoModalOpen,
    selectTodoId,
}) => {
    const { todo, setTodo } = useContext(TodoContext);
    const nav = useNavigate();

    const changeCheckBox = (e) => {
        const changeTodo = { ...selectTodo, isChecked: e.target.checked };

        const newTodo = todo.map((todo) =>
            todo.id === selectTodo.id ? changeTodo : todo
        );

        setTodo(newTodo);
    };

    return (
        <div className="todo-list">
            <input
                type="checkBox"
                checked={selectTodo.isChecked}
                onChange={changeCheckBox}
            />
            <div
                className="todo-text"
                onClick={() => {
                    selectTodoId.current = selectTodo.id;
                    setMemoModalOpen(true);
                }}
            >
                {selectTodo.content}
            </div>
            <div className="button-container">
                <button
                    onClick={() =>
                        nav("/add", {
                            state: {
                                ...selectTodo,
                                date: selectTodo.date.toISOString(),
                            },
                        })
                    }
                >
                    수정
                </button>
                <button
                    onClick={() => {
                        selectTodoId.current = selectTodo.id;
                        setDeleteModalOpen(true);
                    }}
                >
                    삭제
                </button>
            </div>
        </div>
    );
};

export default List;
