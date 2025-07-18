import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { SyncLoader } from "react-spinners";

import CurrentWeatherView from "./components/CurrentWeatherView";
import NextWeatherList from "./components/NextWeatherList";
import DayWeatherList from "./components/DayWeatherList";

import searchButton from "./assets/search-button.png";

function App() {
    const [loading, setLoading] = useState(true);
    const [searchArea, setSearchArea] = useState("");
    const [location, setLocation] = useState({ lat: null, lon: null });
    const [currentWeatherData, setCurrentWeatherData] = useState({});
    const [nextWeatherData, setNextWeatherData] = useState([]);
    const [dayWeatherData, setDayWeatherData] = useState([]);

    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();
    const currentHour = today.getHours();

    const weatherURL = `https://api.openweathermap.org/data/2.5/weather`;
    const forecastURL = "https://api.openweathermap.org/data/2.5/forecast";
    const geoURL = "https://dapi.kakao.com/v2/local/search/address.json";

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
                if (nextWeatherList.length === 16) break;
            }
            setNextWeatherData(nextWeatherList);

            const dayWeatherList = [];
            for (const data of forecastData) {
                const date = data.dt_txt.slice(0, 10);
                const icon = data.weather[0].icon;
                const time = Number(data.dt_txt.slice(11, 13));
                const temp = Math.round(data.main.temp);
                const maxTemp = Math.round(data.main.temp_max);
                const minTemp = Math.round(data.main.temp_min);

                if (!dayWeatherList[date]) {
                    dayWeatherList[date] = {
                        date: date,
                        icon: icon,
                        temp: temp,
                        maxTemp: maxTemp,
                        minTemp: minTemp,
                    };
                }

                if (time === 12) {
                    dayWeatherList[date].temp = temp;
                    dayWeatherList[date].icon = icon;
                }
                if (dayWeatherList[date].maxTemp < maxTemp)
                    dayWeatherList[date].maxTemp = maxTemp;
                if (dayWeatherList[date].minTemp > minTemp)
                    dayWeatherList[date].minTemp = minTemp;
            }
            setDayWeatherData(Object.values(dayWeatherList));

            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const clickSearchButton = async () => {
        try {
            const response = await axios.get(geoURL, {
                params: {
                    query: searchArea,
                },
                headers: {
                    Authorization: `KakaoAK ${
                        import.meta.env.VITE_KAKAO_API_KEY
                    }`,
                },
            });
            const addressData = response.data.documents[0].address;
            setLocation({ lat: addressData.y, lon: addressData.x });
            setSearchArea("");
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
            {loading ? (
                <div className="loading-section">
                    <SyncLoader color="rgb(113, 113, 226)" margin={20} />
                </div>
            ) : (
                <div>
                    <div className="search-bar">
                        <div className="search-input">
                            <input
                                type="text"
                                placeholder="지역을 입력하세요"
                                value={searchArea}
                                onChange={(e) => setSearchArea(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") clickSearchButton();
                                }}
                            />
                            <button onClick={clickSearchButton}>
                                <img src={searchButton} alt="" />
                            </button>
                        </div>
                        <button
                            className="current-button"
                            onClick={getCurrentLocation}
                        >
                            내 위치 찾기
                        </button>
                    </div>
                    <div className="weather-view">
                        <CurrentWeatherView
                            location={location}
                            imgId={currentWeatherData.weather[0].icon}
                            temp={currentWeatherData.main.temp}
                            description={
                                currentWeatherData.weather[0].description
                            }
                            maxTemp={currentWeatherData.main.temp_max}
                            minTemp={currentWeatherData.main.temp_min}
                        />
                    </div>
                    <div className="next-weather-view">
                        {nextWeatherData.map((data, index) => (
                            <NextWeatherList data={data} key={index} />
                        ))}
                    </div>
                    <div className="day-weather-view">
                        {dayWeatherData &&
                            dayWeatherData.map((data, index) => (
                                <DayWeatherList data={data} key={index} />
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
