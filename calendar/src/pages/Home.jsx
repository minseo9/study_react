import "../styles/Home.css";
import dayjs from "dayjs";
import { useState } from "react";
import Header from "../components/Header";
import Calender from "../components/Calendar";
import List from "../components/List";

const testTodo = [
    {
        isChecked: false,
        date: dayjs(),
        content: "test1",
        memo: "memo1",
    },
    {
        isChecked: false,
        date: dayjs(),
        content: "test2",
        memo: "memo",
    },
];

const Home = () => {
    const [date, setDate] = useState(dayjs());
    const [selectedDate, setSelectedDate] = useState(date);
    const [todo, setTodo] = useState([...testTodo]);

    let key = 0;

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
                    date={date}
                    setDate={setDate}
                    setSelectedDate={setSelectedDate}
                    changePrevMonth={changePrevMonth}
                    changeNextMonth={changeNextMonth}
                />
                <Calender
                    date={date}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />
            </div>
            <div className="list-section">
                <div className="select-day-view">{`${selectedDate.year()}년 ${
                    selectedDate.month() + 1
                }월 ${selectedDate.date()}일`}</div>
                {todo.map((todo) =>
                    todo.date.isSame(selectedDate, "day") ? (
                        <List key={key++} todo={todo} />
                    ) : null
                )}
            </div>
        </div>
    );
};

export default Home;
