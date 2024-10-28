
const WeatherCard = ({weatherData, forecastData, setShowCard}) => {
    return(
            //so falta eu alterar o card na parte responsiva para o celular
            <article className='w-full max-w-md bg-[#fff3e4] p-4 shadow-lg mb-4 relative'>
              <button 
              className='absolute top-2 right-3 text-orange-400 text-3xl cursor-pointer z-10'
              onClick={() => setShowCard(false)}>
              &times;
              </button>
              <p className='font-bold text-small text-gray-700 relative -right-10 text-left'>{weatherData.name}</p>
              
              {/* Primeira linha com a temperatura e condicao */}
              <header className='flex relative left-10 font-bold text-3xl text-gray-700 mt-4'>
                <h1 className='capitalize'>{Math.round(weatherData.main.temp)}°C {weatherData.weather[0].description}</h1>
              </header>
              
              {/* Segunda linha com a temperatura minima, maxima e sensacao termica */}
              <section className='flex mt-4'>
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
              </section>

              {/* Terceira linha com vento e umidade */}
              <section className='flex mt-4 ml-8'>
                <p>Vento <strong className='text-gray-700'>{(weatherData.wind.speed * 3.6).toFixed(2)}km/h</strong></p>
                <p className='ml-4'>Humidade <strong className='text-gray-700'>{weatherData.main.humidity}%</strong></p>
              </section>

              {/* os proximos 5 dias */}
              <section className='border-t-2 border-yellow-600 my-4 py-4'>
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
              </section>
            </article>
    )
}

export default WeatherCard