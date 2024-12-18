import sunny from '../assets/images/sunny.png'
import cloudy from '../assets/images/cloudy.png'
import rainy from '../assets/images/rainy.png'
import snowy from '../assets/images/snowy.png'
import fog from '../assets/images/fog.png'
import loadinggif from '../assets/images/loading.gif'
import { useEffect, useState } from 'react'

import React from 'react'


const WeatherApp = () => {
  const [data, setData] = useState({});
  const [location,setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchDefaultWeather = async () => {
      setLoading(true)
      const defaultlocation = 'Cuddalore'
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultlocation}&units=Metric&appid=${import.meta.env.VITE_API_KEY}`
      const res = await fetch(url)
      const defaultData = await res.json()
      setData(defaultData)
      setLoading(false)
    }
    fetchDefaultWeather()
  },[])

  const handleInputChange = (e) => {
      setLocation(e.target.value)
  }
  const search = async () => {
    if(location.trim() !== ''){ 
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${import.meta.env.VITE_API_KEY}`
    const res = await fetch(url)
    const searchData = await res.json()
    if(searchData.cod !== 200){
      setData({notFound: true})
    } else {
     
    console.log(searchData)
    setData(searchData)
    setLocation('')
    }
    setLoading(false)
  }
  }
  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      search()
    }
  }
  const weatherImages = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Snow: snowy,
    Haze: cloudy,
    Mist: cloudy,
    Fog: snowy,
    Drizzle: rainy
  }
  const weatherImage = data.weather ? weatherImages[data.weather[0].main] : null;
  const bgImages = {
    Clear: 'linear-gradient(to right, #f3b07c,#fcd283)',
    Clouds: 'linear-gradient(to right, #57d6d4,#71eeec)',
    Rain: 'linear-gradient(to right, #5bc8fb,#80eaff)',
    Snow: 'linear-gradient(to right, #aff2ff,#fff)',
    Haze: 'linear-gradient(to right, #57d6d4,#71eeec)',
    Mist: 'linear-gradient(to right, #57d6d4,#71eeec)',
    Drizzle: 'linear-gradient(to right, #aff2ff,#fff)',
    Fog: 'linear-gradient(to right, #aff2ff,#fff)',
  }
  const backgroundImage = data.weather ? bgImages[data.weather[0].main] : 'linear-gradient(to right, #f3b07c,#fcd283)'
  const currentDate = new Date()
  const daysOfWeek = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const months = ["Jan", "Feb", "Mar","Apr","May","Jun","Jul",
    "Aug","Sep","Oct","Nov","Dec"];
  const dayOfWeek = daysOfWeek[currentDate.getDay()]
  const month = months[currentDate.getMonth()]
  const dayOfMonth = currentDate.getDate()
  
  const formatDate = `${dayOfWeek}, ${dayOfMonth} ${month}`

  return (
    <div className="container" style={{backgroundImage}}>
      <div className="weather-app" style={
        {
          backgroundImage: backgroundImage && backgroundImage.replace ? backgroundImage.replace('to right', 'to top'):null,
        }
      }>
        <div className="search">
            <div className="search-top">
                <i className="fa-solid fa-location-dot"></i>
                <div className="location">{data.name}</div>
            </div>
            <div className="search-bar">
                <input type="text" value={location} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder="Enter Location" />
                <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
            </div>
        </div>
        
        {loading ? (<img className="loader" src={loadinggif} alt="loading"/>) : data.notFound ? (<div className="not-found">Not Found 😒</div>):(
          <>
            <div className="weather">
            <img src={weatherImage} alt="weather photo" />
            <div className="weather-type">{data.weather ? data.weather[0].main :null}</div>
            <div className="temp">{data.main ? `${Math.floor(data.main.temp)}°`:null}</div>
            </div>
            <div className="weather-date">
              <p>{formatDate}</p>
            </div>
            <div className="weather-data">
            <div className="humidity">
                <div className="data-name">Humidity</div>
                <i className="fa-solid fa-droplet"></i>
                <div className="data">{data.main ? data.main.humidity : null}%</div>  
            </div>
            <div className="wind">
                <div className="data-name">Wind</div>
                <i className="fa-solid fa-wind"></i>
                <div className="data">{data.wind ? data.wind.speed:null}km/h</div>  
            </div>
        </div>
        </>)
        }
        
      </div>
    </div>
  )
}

export default WeatherApp


