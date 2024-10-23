import { useEffect, useState } from "react"
import axios from "axios";

const Weather = () => {
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get('https://api.openweathermap.org/data/2.5/group', {
                    params: {
                        id: '3469058,3448439,3452463,3462463,3448429,3405870,3451190,3464417,3462463,3663517,3403448',
                        appid: '9970279b8f33293ddec249fb791de68a',
                        units: 'metric',
                    }
                })
                setWeatherData(response.data.list)
                console.log(response.data.list)
            } catch (error) {
                console.log('Erro ao buscar o clima:', error)
            }
        }
        fetchWeather();
    },[]);

    return(
        <>        
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-xl">
            {/* Primeira coluna principal */}
            <div>
            {/* Cabeçalhos Min e Max */}
            <div className="grid grid-cols-3 text-center mb-2">
                <p>Min</p>
                <p>Max</p>
                <p></p> {/* Espaço para alinhamento com as cidades */}
            </div>

            {/* Exibindo dados das primeiras capitais */}
            {weatherData.slice(0, Math.ceil(weatherData.length / 2)).map((city) => (
                <div key={city.id} className="grid grid-cols-3 items-center mb-2 font-semibold">
                <p className="text-center">{Math.round(city.main.temp_min)}°</p>
                <p className="text-center">{Math.round(city.main.temp_max)}°</p>
                <h3 className="text-left">{city.name}</h3>
                </div>
            ))}
            </div>

            {/* Segunda coluna principal */}
            <div>
            <div className="grid grid-cols-3 text-center mb-2">
                <p>Min</p>
                <p>Max</p>
                <p></p> {/* Espaço para alinhamento com as cidades */}
            </div>

            {/* Exibindo dados das capitais restantes */}
            {weatherData.slice(Math.ceil(weatherData.length / 2)).map((city) => (
                <div key={city.id} className="grid grid-cols-3 items-center mb-2 font-semibold">
                <p className="text-center">{Math.round(city.main.temp_min)}°</p>
                <p className="text-center">{Math.round(city.main.temp_max)}°</p>
                <h3 className="text-left">{city.name}</h3>
                </div>
            ))}
            </div>
        </div>
        </>
    )
}

export default Weather;