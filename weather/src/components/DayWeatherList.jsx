import "../styles/DayWeatherList.css";

const DayWeatherList = ({ data }) => {
    const imgURL = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
    const dayList = ["일", "월", "화", "수", "목", "금", "토"];
    const day = new Date(data.date).getDay();

    return (
        <div className="day-weather-list">
            <div className="date-text">
                <span>{data.date}</span>
                <span>{dayList[day]}</span>
            </div>
            <img src={imgURL} alt="" />
            <div className="temp-text">{data.temp}°</div>
            <div>
                <span className="min-temp-text">{data.minTemp}°</span>
                <span className="max-temp-text">{data.maxTemp}°</span>
            </div>
        </div>
    );
};

export default DayWeatherList;
