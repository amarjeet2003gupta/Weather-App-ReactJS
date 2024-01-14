import React, { useState } from 'react'
import './weather.css'
import ClearSky from '../asset/clear.png';
import CloudySky from '../asset/cloud.png';
import DrizzleSky from '../asset/drizzle.png';
import HumidSky from '../asset/humidity.png';
import RainSky from '../asset/rain.png';
import SearchIcon from '../asset/search.png';
import SnowSky from '../asset/snow.png';
import WindSky from '../asset/wind.png';

const Weather = () => {

    let api_key = "d012eda43260948563b25b8c23b883fa";

    const [wicon,setWicon] = useState(CloudySky);

    const search = async () => {
        // getElemenetByClassName returns a collection because we can have multiple onclick even on different HTML element
        // getElementById returns a single pointer to the HTML element because it could not be assigned to more than one HTML element
        const element = document.getElementsByClassName("cityInput");
        if(element[0].value === ""){
            alert("Please Enter any Location in Search Bar");
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let response = await fetch(url);
        // Check if the request was successful (status code in the range of 200-299)
        if (!response.ok) {
            // throw new Error(`HTTP error! Status: ${response.status}`);
            alert("Please Enter Valid Location!");
            return 0;
        }
        let data = await response.json();

        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity + " %";
        wind[0].innerHTML = data.wind.speed + " km/h";
        temperature[0].innerHTML = data.main.temp + "°c";
        location[0].innerHTML = data.name;

        if(data.weather[0].icon==="01d" || data.weather[0].icon==='01n'){
            setWicon(ClearSky);
        }
        else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
            setWicon(CloudySky);
        }
        else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
            setWicon(DrizzleSky);
        }
        else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
            setWicon(DrizzleSky);
        }
        else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
            setWicon(RainSky);
        }
        else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
            setWicon(RainSky);
        }
        else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
            setWicon(SnowSky);
        }
        else{
            setWicon(ClearSky);
        }
    }

    const TappedOnEnterKey = (e) => {
        if(e.key === 'Enter'){
            search();
        }
    }

  return (
    <div className='container'>
        <div className="top-bar">
            <input type="text" className="cityInput" placeholder='Search' onKeyDown={TappedOnEnterKey}/>
            {/* ()=>{search()} */}
            <div className="search-icon" onClick={search}>
                <img src={SearchIcon} alt="This is an Image" />
            </div>
        </div>
        <div className="weather-image">
            <img src={wicon} alt="" />
        </div>
        <div className="weather-temp">24°c</div>
        <div className="weather-location">London</div>
        <div className="data-container">
            <div className="element">
                <img src={HumidSky} alt=""  className='icon'/>
                <div className="data">
                    <div className="humidity-percent">64%</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={WindSky} alt=""  className='icon'/>
                <div className="data">
                    <div className="wind-rate">18 km/h</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Weather