import { useState } from 'react'
import './App.css'

import axios from 'axios';
import Weather from './components/Weather';


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
        console.log(dailyWeatherResponse.data);
        setForeCastData(filteredForecast);
        console.log(filteredForecast);
        setError(null)
        setShowCard(true)
      } catch (error) {
        setError('Erro ao buscar os dados do tempo')
        setShowCard(false)
        console.log(error)
      }
    }

  return (
    <div className='flex flex-col items-center justify-center text-center min-h-screen bg-gradient-to-b from-orange-500 to-yellow-500'>
        <h1 className='text-7xl font-bold text-white mb-12 text-3xl sm:text-7xl'>Previsão do Tempo</h1>
      <div className='w-full max-w-lg p-2 relative border-b border-white flex justify-center'>
        <form 
          onSubmit={(e) => e.preventDefault()}
          className='w-full'>
              {weatherData && showCard && ( //so falta eu alterar o card na parte responsiva para o celular
              <div className='w-full bg-[#fff3e4] p-4 shadow-lg mb-4 relative'>
                <button 
                className='absolute top-2 right-3 text-orange-400 text-3xl cursor-pointer z-10'
                onClick={() => setShowCard(false)}>
                &times;
                </button>
                <p className='font-bold text-small text-gray-700 relative -right-10 text-left'>{weatherData.name}</p>
                
                {/* Primeira linha com a temperatura e condicao */}
                <div className='flex relative left-10 font-bold text-3xl text-gray-700 mt-4'>
                  <h1 className='capitalize'>{Math.round(weatherData.main.temp)}°C {weatherData.weather[0].description}</h1>
                </div>
                
                {/* Segunda linha com a temperatura minima, maxima e sensacao termica */}
                <div className='flex mt-4'>
                  <div className='flex ml-7'>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-blue-500 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 17l-4 4m0 0l-4-4m4 4V3" />
                    </svg>
                    <p className='text-gray-700 font-bold'>{weatherData.main.temp_min.toFixed(1)}°</p>
                  </div>

                  <div className='flex'>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-red-500 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7l4-4m0 0l4 4m-4-4v18" />
                    </svg>
                    <p className='text-gray-700 font-bold'>{Math.round(weatherData.main.temp_max)}°</p>
                  </div>

                  <p className='ml-6'>Sensação <strong className='text-gray-700'>{Math.round(weatherData.main.feels_like)}°C</strong></p>
                </div>

                {/* Terceira linha com vento e umidade */}
                <div className='flex mt-4 ml-8'>
                  <p>Vento <strong className='text-gray-700'>{(weatherData.wind.speed * 3.6).toFixed(2)}km/h</strong></p>
                  <p className='ml-4'>Humidade <strong className='text-gray-700'>{weatherData.main.humidity}%</strong></p>
                </div>

                {/* os proximos 5 dias */}
                <div className='border-t-2 border-yellow-600 my-4 py-4'>
                  <div className='grid grid-cols-5 gap-4 text-center'>
                    {forecastData.map((forecast, index) => (
                      <div key={index} className='flex flex-col items-center'>
                        <p className='font-bold text-gray-700 capitalize'>{new Date(forecast.dt_txt).toLocaleDateString('pt-BR', {weekday: 'short'})}</p>
                        <div className='flex justify-evenly w-full text-orange-400 font-bold'>
                          <p>{Math.round(forecast.main.temp_max)}°</p>
                          <p>{Math.round(forecast.main.temp_min)}°</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          <div className='w-full relative'>
            <input 
            type="text"
            placeholder='Insira aqui o nome da cidade'
            value={city}
            className='mb-8 w-full p-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500'
            onChange={(e) => setCity(e.target.value)}
            />
            <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="1em"
            width="1em"
            className='absolute right-2 top-5 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer'
            onClick={getWeather}
            {...props}
            >
            <path d="M19.023 16.977a35.13 35.13 0 01-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0016 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z" />
            </svg>
          </div>
            {error && <p>{error}</p>}
        </form>
      </div>

      <main className='max-w-6xl mx-auto flex flex-col justify-center'>
        <h1 className='text-white text-4xl font-bold my-4 text-center w-2/4'>Capitais</h1>
        <div>
          <Weather/>
        </div>
      </main>

    </div>
  )
}

export default App
