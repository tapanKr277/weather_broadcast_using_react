import {TbTemperatureCelsius} from 'react-icons/tb'
import {WiHumidity} from 'react-icons/wi'
import {BsSpeedometer} from 'react-icons/bs'


const Output = ({data}) =>{
    return (
        <div className='my-1'>
            {
                (Object.keys(data).length===2 || Object.keys(data).length===0)  ? (<p className="tracking-wider  text-sm capitalize">Enter Valid City/State Name</p>) :
                <div className="font-bold flex flex-wrap flex-col items-center justify-center justify-items-center ">
                    <p>City/State Name {data.name}</p>
                    <h3> Temp  {data.main.temp} </h3>
                    <div className="relative">
                        <div>
                            <TbTemperatureCelsius className="absolute right-[-59px] bottom-[9px] grid place-items-center" ></TbTemperatureCelsius>
                        </div>
                    </div>
                    <p>Humidity {data.main.humidity} </p>
                    
                    <div className="relative">
                        <div>
                            <WiHumidity className="absolute right-[-63px] bottom-[10px] grid place-items-center" ></WiHumidity> 
                        </div>
                    </div>
                    <p>Wind Speed {data.wind.speed}</p>
                    <div className="relative">
                        <div>
                            <BsSpeedometer className="w-[10px] absolute right-[-75px] bottom-[12px] grid place-items-center" ></BsSpeedometer> 
                        </div>
                    </div>
                    <img className="inset-x-0"
                    src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                    alt={data.weather[0].description}/>
                    <p>{data.weather[0].description}</p>
                    
                </div> 
            }
      </div>
    )
}
export default Output