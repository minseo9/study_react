import "../styles/Header.css";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { DateContext } from "../App";
import { SelectedDatContext } from "../App";

const Header = () => {
    const { date, setDate } = useContext(DateContext);
    const { selectedDate, setSelectedDate } = useContext(SelectedDatContext);

    const nav = useNavigate();

    function changePrevMonth() {
        setDate(date.subtract(1, "month"));
    }

    function changeNextMonth() {
        setDate(date.add(1, "month"));
    }

    const movingToday = () => {
        setDate(dayjs());
        setSelectedDate(dayjs());
    };

    const movingAdd = () => {
        nav("/add");
    };

    return (
        <div className="header">
            <div className="year-container">
                <div>{date.year()}년</div>
                <button onClick={movingToday}>today</button>
                <button onClick={movingAdd}>+</button>
            </div>
            <div className="month-container">
                <button onClick={changePrevMonth}>&lt;</button>
                <div>{date.month() + 1}월</div>
                <button onClick={changeNextMonth}>&gt;</button>
            </div>
        </div>
    );
};

export default Header;
