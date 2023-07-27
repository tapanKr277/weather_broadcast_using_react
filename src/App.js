import './App.css';
import { useState } from 'react';
import Output from './components/Output';
import Spinner from './components/Spinner';

function App() {

  const [data, setData]=useState([])
  const [cityName, setCityName]=useState('')
  const [loading, setLoading]=useState(true)

  const inputHnadler=(e)=>{
    let val=e.target.value;
    setCityName(val);
  }

  const formHandler=(e)=>{
    e.preventDefault();
    async function fetchData(){
      try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=35e18e5f5025dc2beda4c1d72b6873f1&units=metric`
        let apiData = await fetch(url);
        let fecthdata = await apiData.json() 
        setData(fecthdata)
        setLoading(false)
      }
      catch(error){
        console.log("enter valid city name")
      }
    };
    fetchData();
    
  }

  return (
    <div className="flex flex-wrap flex-col items-center justify-center justify-items-center h-[100vh] w-[100vw] bg-slate-800 text-white">
      <h1 className='text-4xl font-bold'>weather Broadcast</h1>
      <div className='bg-violet-400 mx-auto w-[200px] h-[4px] mt-2'>

      </div>
      <div className="md:w-[700px] gap-2 text-black bg-white flex flex-col justify-center items-center mt-10 p-10 transition-all duration-700 hover:shadow-xl rounded-md ">
        <form onSubmit={formHandler}>
            <div className='grid gap-4 grid-cols-3' >
              <label className='tracking-wider mt-1 font-bold text-2sm capitalize'>
                Enter City/State Name
              </label>
              <input onChange={inputHnadler}  className="tracking-wide" id="grid-first-name" type="text" placeholder="City/State Name" required ></input>
              <button className="bg-violet-400 hover:bg-violet-500 transition-all duration-200 cursor-pointer px-10 py-2 rounded-md font-bold text-white text-lg">Submit</button>
            </div>
        </form>
        {
          loading ? <Spinner>Enter City Name</Spinner> : <Output data={data} cityName={cityName}></Output>
        }
    </div>
    
    </div>
  );
}
export default App;
