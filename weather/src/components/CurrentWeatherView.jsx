import axios from "axios";
import { useState } from "react";
import "../styles/CurrentWeatherView.css";

const CurrentWeatherView = ({
    location,
    imgId,
    temp,
    description,
    maxTemp,
    minTemp,
}) => {
    const [addressName, setAddressName] = useState("");
    const imgURL = `https://openweathermap.org/img/wn/${imgId}@2x.png`;
    const geoURL = "https://dapi.kakao.com/v2/local/geo/coord2regioncode.json";

    const getAddressName = async () => {
        try {
            const response = await axios.get(geoURL, {
                params: {
                    x: location.lon,
                    y: location.lat,
                },
                headers: {
                    Authorization: `KakaoAK ${
                        import.meta.env.VITE_KAKAO_API_KEY
                    }`,
                },
            });

            setAddressName(response.data.documents[0].address_name);
        } catch (error) {
            console.log(error);
        }
    };

    getAddressName();

    return (
        <div className="current-weather-view">
            <span className="address-name-view">{addressName}</span>
            <hr />
            <div>
                <div className="weather-info-view">
                    <h2>{temp.toFixed(1)}°</h2>
                    <img src={imgURL} alt="" />
                </div>
                <span className="weather-text">{description}</span>
            </div>
            <div className="temp-view">
                <span>최고: {maxTemp.toFixed(1)}</span>
                <span>최저: {minTemp.toFixed(1)}</span>
            </div>
        </div>
    );
};

export default CurrentWeatherView;
