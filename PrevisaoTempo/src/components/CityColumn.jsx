import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const CityColumn = () => {
    const [weatherData, setWeatherData] = useState([]);

    const API_KEY = ''

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get('https://api.openweathermap.org/data/2.5/group', {
                    params: {
                        id: '3469058,3448439,3452463,3405870,3451190,3663517,3470127,3450554,6322752,6320062,3397277',
                        appid: API_KEY,
                        units: 'metric',
                    }
                })
                setWeatherData(response.data.list)
            } catch (error) {
                console.log('Erro ao buscar o clima:', error)
            }
        }
        fetchWeather();
    },[]);

    return(
    <>        
        <section className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-xl">
            {/* Primeira coluna principal */}
            <div>
                {/* Cabeçalhos Min e Max */}
                <div className="grid grid-cols-3 text-center mb-2">
                    <p>Min</p>
                    <p>Max</p>
                    <span></span>
                </div>

                {/* Exibindo dados das primeiras capitais */}
                <ul>
                    {weatherData.slice(0, Math.ceil(weatherData.length / 2)).map((city) => (
                        <li key={city.id} className="grid grid-cols-3 items-center mb-2 font-semibold">
                        <p className="text-center">{Math.round(city.main.temp_min)}°</p>
                        <p className="text-center">{Math.round(city.main.temp_max)}°</p>
                        <h3 className="text-left">{city.name}</h3>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Segunda coluna principal */}
            <div>
                <div className="grid grid-cols-3 text-center mb-2">
                    <p>Min</p>
                    <p>Max</p>
                    <span></span>
                </div>

                {/* Exibindo dados das capitais restantes */}
                <ul>
                    {weatherData.slice(Math.ceil(weatherData.length / 2)).map((city) => (
                        <li key={city.id} className="grid grid-cols-3 items-center mb-2 font-semibold">
                            <p className="text-center">{Math.round(city.main.temp_min)}°</p>
                            <p className="text-center">{Math.round(city.main.temp_max)}°</p>
                            <h3 className="text-left">{city.name}</h3>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    </>
    )
}

export default CityColumn;