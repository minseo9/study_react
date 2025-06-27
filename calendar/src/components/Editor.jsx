import "../styles/Editor.css";
import dayjs from "dayjs";
import { useNavigate, useLocation } from "react-router-dom";

import { useContext, useState, useEffect } from "react";
import { SelectedDatContext, TodoContext } from "../App";

// 수정인지 새로 추가인지 확인할 수 있을만한..게 필요함
const Editor = () => {
    const { selectedDate } = useContext(SelectedDatContext);
    const { todo, setTodo } = useContext(TodoContext);
    const nav = useNavigate();
    const location = useLocation();

    const [inputTodo, setInputTodo] = useState({
        id: null,
        isChecked: false,
        date: selectedDate,
        content: "",
        memo: "",
    });

    useEffect(() => {
        if (location.state) {
            setInputTodo({
                id: location.state.id,
                isChecked: location.state.isChecked,
                date: dayjs(location.state.date),
                content: location.state.content,
                memo: location.state.memo,
            });
        }
    }, [location.state]);

    const changeInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === "date") {
            setInputTodo({ ...inputTodo, [name]: dayjs(value) });
        } else {
            setInputTodo({ ...inputTodo, [name]: value });
        }
    };

    const saveNewTodo = () => {
        if (location.state) {
            const newTodo = todo.map((todo) =>
                todo.id === inputTodo.id ? inputTodo : todo
            );

            setTodo(newTodo);
        } else {
            const todayTodoNum = todo.filter((todo) =>
                selectedDate.isSame(inputTodo.date, "day")
            );
            const todoId = `${inputTodo.date.format("YYYY-MM-DD")}-${
                todayTodoNum.length + 1
            }`;
            const newTodo = { ...inputTodo, id: todoId };

            setTodo([...todo, newTodo]);
        }

        nav("/", { replace: true });
    };

    const modifyTodo = () => {
        console.log("수정");
    };

    return (
        <div className="add-input">
            <section className="prev-button-container">
                <button onClick={() => nav(-1, { replace: true })}>&lt;</button>
            </section>
            <section className="input-container">
                <input
                    name="date"
                    type="date"
                    value={inputTodo.date.format("YYYY-MM-DD")}
                    onChange={changeInput}
                />
                <input
                    name="content"
                    type="text"
                    id="todoInput"
                    value={inputTodo.content}
                    onChange={changeInput}
                    placeholder="할 일"
                />
                <textarea
                    name="memo"
                    cols="50"
                    rows="5"
                    placeholder="메모"
                    value={inputTodo.memo}
                    onChange={changeInput}
                ></textarea>
            </section>
            <section className="submit-button-container">
                <button
                    onClick={() => (inputTodo.content ? saveNewTodo() : null)}
                >
                    저장
                </button>
            </section>
        </div>
    );
};

export default Editor;
