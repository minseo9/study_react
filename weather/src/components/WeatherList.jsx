const WeatherList = ({ max, min }) => {
    const maxTemp = Math.round(max);
    const minTemp = Math.round(min);

    return (
        <div>
            <div>날짜</div>
            <div>{maxTemp}</div>
            <div>{minTemp}</div>
        </div>
    );
};

export default WeatherList;
