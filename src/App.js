import './App.css';
import { useState } from 'react';
import Output from './components/Output';
import Spinner from './components/Spinner';

function App() {
  const [data, setData] = useState([]);
  const [cityName, setCityName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const inputHandler = (e) => {
    setCityName(e.target.value);
    setErrorMsg(''); // clear error on input change
  };

  const formHandler = (e) => {
    e.preventDefault();
    async function fetchData() {
      try {
        setLoading(true);
        setErrorMsg('');
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
        const apiData = await fetch(url);
        const fetchedData = await apiData.json();

        if (fetchedData.cod !== 200) {
          setErrorMsg(fetchedData.message || 'Unable to fetch data');
          setData([]);
        } else {
          setData(fetchedData);
        }

        setLoading(false);
      } catch (error) {
        setErrorMsg('Something went wrong. Please try again.');
        setLoading(false);
        setData([]);
      }
    }
    fetchData();
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 to-slate-700 text-white flex flex-col items-center justify-start py-10 px-4">
      <h1 className="text-5xl font-extrabold tracking-wide text-center mb-2 animate-fade-in">
        Weather Broadcast
      </h1>
      <div className="bg-violet-500 h-1 w-32 rounded-full mb-10"></div>

      <div className="bg-white text-black rounded-xl p-8 w-full max-w-2xl shadow-2xl transition-all duration-500 hover:shadow-violet-500/30 animate-fade-in-up">
        <form onSubmit={formHandler} className="flex flex-col sm:flex-row sm:items-center gap-4">
          <label htmlFor="city-input" className="font-semibold tracking-wide text-sm sm:text-base">
            Enter City/State Name:
          </label>
          <input
            onChange={inputHandler}
            id="city-input"
            type="text"
            placeholder="e.g. Jamshedpur"
            required
            className="flex-1 px-4 py-2 border border-violet-400 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          <button
            type="submit"
            className="bg-violet-500 text-white font-bold px-6 py-2 rounded-md hover:bg-violet-600 transition duration-200"
          >
            Submit
          </button>
        </form>

        {errorMsg && (
          <div className="mt-4 text-red-600 text-center animate-pulse transition-all duration-300">
            ❌ {errorMsg}
          </div>
        )}

        <div className="mt-8">
          {loading ? (
            <Spinner>Loading weather data...</Spinner>
          ) : (
            data.main && <Output data={data} cityName={cityName} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
