import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

import WeatherView from "./components/WeatherView";
import WeatherList from "./components/WeatherList";
import searchButton from "./assets/search-button.png";

function App() {
    const [location, setLocation] = useState({ lat: null, lon: null });
    const [weatherData, setWeatherData] = useState({});
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather`;

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
            setWeatherData(response.data);
            console.log(response.data);
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
                {weatherData.weather && (
                    <WeatherView
                        location={location}
                        imgId={weatherData.weather[0].icon}
                        temp={weatherData.main.temp}
                        description={weatherData.weather[0].description}
                        max={weatherData.main.temp_max}
                        min={weatherData.main.temp_min}
                    />
                )}
            </div>

            <div className="weather-list">
                {weatherData.main && (
                    <WeatherList
                        max={weatherData.main.temp_max}
                        min={weatherData.main.temp_min}
                    />
                )}
            </div>
        </div>
    );
}

export default App;
