import "../styles/Header.css";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const Header = ({
    date,
    setDate,
    setSelectedDate,
    changePrevMonth,
    changeNextMonth,
}) => {
    const nav = useNavigate();

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
