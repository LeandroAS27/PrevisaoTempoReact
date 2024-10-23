import { useState } from 'react'
import './App.css'

import axios from 'axios';
import CitySearch from './components/CitySearch';
import WeatherCard from './components/WeatherCard';
import CityColumn from './components/CityColumn';


function App(props) {
    const [city, setCity] = useState('')
    const [error, setError] = useState()
    const [weatherData, setWeatherData] = useState(null)
    const [forecastData, setForeCastData] = useState([]);
    const [showCard, setShowCard] = useState(true)

    const API_KEY = '9970279b8f33293ddec249fb791de68a';

    async function getWeather() {
      try {
        const dailyWeatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/weather',{
          params: {
            q: city,
            appid: API_KEY,
            units: 'metric',
            lang: 'pt_br',
          }
        });

        const forecastWeatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
          params:{
            q:city,
            appid: API_KEY,
            units: 'metric',
          }
        });

        const filteredForecast = forecastWeatherResponse.data.list.filter((forecast) => {
          return forecast.dt_txt.includes('12:00:00');
        });

        setWeatherData(dailyWeatherResponse.data);
        setForeCastData(filteredForecast);
        setError(null)
        setShowCard(true)
      } catch (error) {
        setError('Erro ao buscar os dados do tempo')
        setShowCard(false)
      }
    }

  return (
    <div className='flex flex-col items-center justify-center text-center min-h-lvh min-w-lvh bg-gradient-to-b from-orange-500 to-yellow-500'>
        <h1 className='text-7xl font-bold text-white mb-12 text-3xl sm:text-7xl'>Previsão do Tempo</h1>

        <CitySearch city={city} setCity={setCity} getWeather={getWeather} props={props}/>

        {weatherData && showCard && (
          <WeatherCard weatherData={weatherData} forecastData={forecastData} setShowCard={setShowCard}/>
        )}

        {error && <p>{error}</p>}
      <main className='max-w-6xl mx-auto flex flex-col justify-center'>
        <h1 className='text-white text-4xl font-bold my-4 text-center w-2/4'>Capitais</h1>
        <div>
          <CityColumn/>
        </div>
      </main>

    </div>
  )
}

export default App
