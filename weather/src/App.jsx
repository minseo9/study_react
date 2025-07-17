import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

import CurrentWeatherView from "./components/CurrentWeatherView";
import WeatherList from "./components/WeatherList";
import searchButton from "./assets/search-button.png";
import NextWeatherList from "./components/NextWeatherList";

function App() {
    const [location, setLocation] = useState({ lat: null, lon: null });
    const [currentWeatherData, setCurrentWeatherData] = useState({});
    const [nextWeatherDate, setNextWeatherData] = useState([]);

    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();
    const currentHour = today.getHours();

    let num = 1;

    const weatherURL = `https://api.openweathermap.org/data/2.5/weather`;
    const forecastURL = "https://api.openweathermap.org/data/2.5/forecast";

    const getCurrentLocation = () => {
        const success = (position) => {
            setLocation({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
            });
        };

        const error = () => {
            console.log("현재 위치를 가져올 수 없습니다.");
        };

        if (!navigator.geolocation) {
            console.log("브라우저가 위치 정보를 지원하지 않음.");
        } else {
            console.log("위치 파악 중..");
        }

        navigator.geolocation.getCurrentPosition(success, error);
    };

    const getCurrentLocationWeather = async () => {
        try {
            const response = await axios.get(weatherURL, {
                params: {
                    lat: location.lat,
                    lon: location.lon,
                    appid: import.meta.env.VITE_WEATHER_API_KEY,
                    units: "metric",
                    lang: "kr",
                },
            });
            setCurrentWeatherData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getForecast = async () => {
        try {
            const response = await axios.get(forecastURL, {
                params: {
                    lat: location.lat,
                    lon: location.lon,
                    appid: import.meta.env.VITE_WEATHER_API_KEY,
                    units: "metric",
                    lang: "kr",
                },
            });

            const forecastData = response.data.list;
            console.log(forecastData);

            const nextWeatherList = [];
            for (const data of forecastData) {
                const month = Number(data.dt_txt.slice(5, 7));
                const date = Number(data.dt_txt.slice(8, 10));
                const hour = Number(data.dt_txt.slice(11, 13));

                if (month === currentMonth && date === currentDate) {
                    if (hour > currentHour) nextWeatherList.push(data);
                } else {
                    nextWeatherList.push(data);
                }
                if (nextWeatherList.length === 5) break;
            }
            setNextWeatherData(nextWeatherList);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCurrentLocation();
    }, []);

    useEffect(() => {
        if (location.lat !== null && location.lon !== null) {
            getCurrentLocationWeather();
            getForecast();
        }
    }, [location]);

    return (
        <div className="weather">
            <div className="search-bar">
                <div className="search-input">
                    <input type="text" placeholder="지역을 입력하세요" />
                    <button>
                        <img src={searchButton} alt="" />
                    </button>
                </div>
                <button className="current-button">내 위치 찾기</button>
            </div>
            <div className="weather-view">
                {currentWeatherData.weather && (
                    <CurrentWeatherView
                        location={location}
                        imgId={currentWeatherData.weather[0].icon}
                        temp={currentWeatherData.main.temp}
                        description={currentWeatherData.weather[0].description}
                        maxTemp={currentWeatherData.main.temp_max}
                        minTemp={currentWeatherData.main.temp_min}
                    />
                )}
            </div>
            <div className="next-weather-view">
                {nextWeatherDate.map((data) => (
                    <NextWeatherList data={data} key={num++} />
                ))}
            </div>
            <div className="weather-list">
                {currentWeatherData.main && (
                    <WeatherList
                        maxTemp={currentWeatherData.main.temp_max}
                        minTemp={currentWeatherData.main.temp_min}
                    />
                )}
            </div>
        </div>
    );
}

export default App;
