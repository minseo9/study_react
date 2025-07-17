import "../styles/NextWeatherList.css";

const NextWeatherList = ({ data }) => {
    const imgURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const date = data.dt_txt.slice(0, 10);
    const time = data.dt_txt.slice(10, 16);

    return (
        <div className="next-weather-list">
            <div className="date-view">
                <span>{date}</span>
                <span>{time}</span>
            </div>
            <div className="next-weather-img">
                <img src={imgURL} alt="" />
            </div>
            <div className="temp-text-view">
                <span>{Math.round(data.main.temp)}°</span>
            </div>
        </div>
    );
};

export default NextWeatherList;
