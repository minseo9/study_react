import "../styles/Calendar.css";
import dayjs from "dayjs";

import { useContext } from "react";
import { DateContext } from "../App";
import { SelectedDatContext } from "../App";

const Calendar = () => {
    const { date } = useContext(DateContext);
    const { selectedDate, setSelectedDate } = useContext(SelectedDatContext);

    const today = dayjs();
    const prevMonth = date.subtract(1, "month");
    const prevLastDate = prevMonth.endOf("month").date();
    const currLastDate = date.daysInMonth();
    const currFirstDay = date.startOf("month").day();
    const currLastDay = date.endOf("month").day();

    const prevDays = [...Array(currFirstDay)]
        .map((_, i) => prevLastDate - i)
        .reverse();
    const currDays = [...Array(currLastDate)].map((_, i) => i + 1);
    const nextDays = [...Array(6 - currLastDay)].map((_, i) => i + 1);

    const isToday = (day) => {
        return today.isSame(date.date(day), "day");
    };

    const isSelectedDate = (day) => {
        return selectedDate.isSame(date.date(day), "day");
    };

    const changeSelectedDate = (e) => {
        setSelectedDate(date.date(e.target.textContent));
    };

    return (
        <div>
            <div className="day-list">
                <div>일</div>
                <div>월</div>
                <div>화</div>
                <div>수</div>
                <div>목</div>
                <div>금</div>
                <div>토</div>
            </div>
            <div className="date-list">
                {prevDays.map((day) => (
                    <div key={day} className="not-current-days">
                        {day}
                    </div>
                ))}
                {currDays.map((day) => (
                    <div
                        onClick={changeSelectedDate}
                        key={day}
                        className={
                            isToday(day)
                                ? "today"
                                : isSelectedDate(day)
                                ? "selected-date"
                                : "current-days"
                        }
                    >
                        {day}
                    </div>
                ))}
                {nextDays.map((day) => (
                    <div key={day} className="not-current-days">
                        {day}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
