
const CitySearch = ({city, setCity, getWeather}) => {
    return(
        <div className='w-full max-w-lg p-2 relative border-b border-white flex justify-center'>
          <form 
            onSubmit={(e) => e.preventDefault()}
            className='w-full'>
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
              >
              <path d="M19.023 16.977a35.13 35.13 0 01-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0016 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z" />
              </svg>
            </div>
          </form>
      </div>
    )
}

export default CitySearch;