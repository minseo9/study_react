import "../styles/Home.css";
import dayjs from "dayjs";
import Header from "../components/Header";
import Calender from "../components/Calendar";
import List from "../components/List";
import DeleteModal from "../components/DeleteModal";
import MemoModal from "../components/MemoModal";

import { useContext, useState, useRef } from "react";
import { DateContext } from "../App";
import { SelectedDatContext } from "../App";
import { TodoContext } from "../App";

const Home = () => {
    const { date, setDate } = useContext(DateContext);
    const { selectedDate, setSelectedDate } = useContext(SelectedDatContext);
    const { todo } = useContext(TodoContext);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [memoModalOpen, setMemoModalOpen] = useState(false);
    let selectTodoId = useRef();

    function changePrevMonth() {
        setDate(date.subtract(1, "month"));
    }

    function changeNextMonth() {
        setDate(date.add(1, "month"));
    }

    return (
        <div>
            <div className="calendar-section">
                <Header
                    changePrevMonth={changePrevMonth}
                    changeNextMonth={changeNextMonth}
                />
                <Calender
                    changePrevMonth={changePrevMonth}
                    changeNextMonth={changeNextMonth}
                />
            </div>
            <div className="list-section">
                <div className="select-day-view">{`${selectedDate.year()}년 ${
                    selectedDate.month() + 1
                }월 ${selectedDate.date()}일`}</div>
                {todo
                    .filter(
                        (todo) =>
                            todo.date.isSame(selectedDate, "day") &&
                            !todo.isChecked
                    )
                    .map((todo) => (
                        <List
                            key={todo.id}
                            selectTodo={todo}
                            setDeleteModalOpen={setDeleteModalOpen}
                            setMemoModalOpen={setMemoModalOpen}
                            selectTodoId={selectTodoId}
                        />
                    ))}
                {todo
                    .filter(
                        (todo) =>
                            todo.date.isSame(selectedDate, "day") &&
                            todo.isChecked
                    )
                    .map((todo) => (
                        <List
                            key={todo.id}
                            selectTodo={todo}
                            setDeleteModalOpen={setDeleteModalOpen}
                            setMemoModalOpen={setMemoModalOpen}
                            selectTodoId={selectTodoId}
                        />
                    ))}
            </div>
            <DeleteModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                selectTodoId={selectTodoId}
            />
            <MemoModal
                isOpen={memoModalOpen}
                onClose={() => setMemoModalOpen(false)}
                selectTodoId={selectTodoId}
            />
        </div>
    );
};

export default Home;
