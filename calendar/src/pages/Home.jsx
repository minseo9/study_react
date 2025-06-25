import "../styles/Home.css";
import Header from "../components/Header";
import Calender from "../components/Calendar";
import List from "../components/List";

import { useContext } from "react";
import { SelectedDatContext } from "../App";
import { TodoContext } from "../App";

const Home = () => {
    const { selectedDate, setSelectedDate } = useContext(SelectedDatContext);
    const { todo } = useContext(TodoContext);

    let key = 0;

    console.log(todo);

    return (
        <div>
            <div className="calendar-section">
                <Header />
                <Calender />
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
