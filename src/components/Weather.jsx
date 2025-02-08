import React, { useEffect, useRef, useState } from 'react';
import './Weather.css'
import search_icon from '../assets/loupe.png'
import clear_sky_day from '../assets/01d.png';
import clear_sky_night from '../assets/01n.png';

import few_clouds_day from '../assets/02d.png';
import few_clouds_night from '../assets/02n.png';

import scattered_clouds_day from '../assets/03dn.png';
import scattered_clouds_night from '../assets/03dn.png';

import broken_clouds_day from '../assets/04dn.png';
import broken_clouds_night from '../assets/04dn.png';

import shower_rain_day from '../assets/09dn.png';
import shower_rain_night from '../assets/09dn.png';

import rain_day from '../assets/10d.png';
import rain_night from '../assets/10n.png';

import thunderstorm_day from '../assets/11d.png';
import thunderstorm_night from '../assets/11n.png';

import snow_day from '../assets/13dn.png';
import snow_night from '../assets/13dn.png';

import mist_day from '../assets/50dn.png';
import mist_night from '../assets/50dn.png';

import wind_icon from '../assets/wind.png'
import hummidity_icon from '../assets/humidity.png'
import { message } from 'antd';



const Weather = () => {

    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    
    const allIcons = { 
        "01d": clear_sky_day, 
        "01n": clear_sky_night, 
        "02d": few_clouds_day, 
        "02n": few_clouds_night, 
        "03d": scattered_clouds_day, 
        "03n": scattered_clouds_night, 
        "04d": broken_clouds_day, 
        "04n": broken_clouds_night, 
        "09d": shower_rain_day, 
        "09n": shower_rain_night, 
        "10d": rain_day, 
        "10n": rain_night, 
        "11d": thunderstorm_day, 
        "11n": thunderstorm_night, 
        "13d": snow_day, 
        "13n": snow_night, 
        "50d": mist_day, 
        "50n": mist_night,
    };


    const search = async (city) => {

        if (city === "") {
            messageApi.open({
                type: 'error',
                content: 'Please enter the city name!',
            });
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`
            console.log("import.meta.env.VITE_API_KEY", import.meta.env.VITE_API_KEY);


            const reponse = await fetch(url)
            const data = await reponse.json()
            const icon = allIcons[data.weather[0].icon] || clear_icon
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })

        } catch (error) {
            if(city!==""){
                messageApi.open({
                    type: 'error',
                    content: 'Please enter the correct city name!',
                });
            }
        }
    }

    useEffect(()=>{
        search('Ho chi Minh City')
    }, [])


    return (
        
        <div className='weather'>
        {contextHolder}
            <div className='search-bar'>
                <input ref={inputRef} type='text' placeholder='Search...' />
                <img src={search_icon} alt='' onClick={()=> search(inputRef.current.value)} />
            </div>

            <img src={weatherData.icon} alt='' className='weather-icon' />
            <p className='temperature'>{weatherData.temperature}°C</p>
            <p className='location'>{weatherData.location}</p>

            <div className='weather-data'>
                <div className='col'>
                    <img src={hummidity_icon} alt='' />
                    <div>
                        <p>{weatherData.humidity} %</p>
                        <span>Humidity</span>
                    </div>
                </div>

                <div className='col'>
                    <img src={wind_icon} alt='' />
                    <div>
                        <p>{weatherData.windSpeed} Km/h</p>
                        <span>wind Spees</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;