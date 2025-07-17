const WeatherList = ({ maxTemp, minTemp }) => {
    return (
        <div className="weather-list">
            <div>날짜</div>
            <div>{Math.round(maxTemp)}</div>
            <div>{Math.round(minTemp)}</div>
        </div>
    );
};

export default WeatherList;
