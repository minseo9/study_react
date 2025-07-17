import axios from "axios";
import { useState } from "react";
import "../styles/WeatherView.css";

const WeatherView = ({ location, imgId, temp, description, max, min }) => {
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
        <div>
            <span className="address-name-view">{addressName}</span>
            <hr />
            <div className="weather-info-view">
                <div className="weather-text-view">
                    <h2>{temp.toFixed(1)}°</h2>
                    <span>{description}</span>
                </div>
                <div className="weather-img-view">
                    <img src={imgURL} alt="" />
                </div>
            </div>
            <div className="temp-view">
                <span>최고: {max.toFixed(1)}</span>
                <span>최저: {min.toFixed(1)}</span>
            </div>
        </div>
    );
};

export default WeatherView;
