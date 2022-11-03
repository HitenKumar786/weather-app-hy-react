import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

import { useState, useEffect } from "react";
import axios from "axios";

function Hi() {

  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState({});



  const submitHandler = (e) => {
    e.preventDefault();

    console.log("city: " + cityName);
   axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=e0f99c494c2ce394a18cc2fd3f100543&units=metric`)
      .then(function (response) {

        console.log("data: ", response.data);

        setWeather(response.data)

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  useEffect(() => {
    const getWeather = () => { // get current weather 
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Karachi&appid=e0f99c494c2ce394a18cc2fd3f100543&units=metric`)
        .then(function (response) {

          console.log("data: ", response.data);
          setWeather(response.data)

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }
    getWeather();
  }, [])



  return <div>

<div id='main'>
   
    <h1 id='header'>
      weather app:
    </h1>

    <form onSubmit={submitHandler}>

      <input
        type="text"
        placeholder='Enter your City Name'
        onChange={(e) => {
          setCityName(e.target.value)
        }}
      />

      <button type="submit">Get Weather</button>

    </form>

    <br />

    {(weather?.name)?

      <div id='temperture'>
        <div>Weather of {weather?.name}</div> 
        <br />
        <div id='c-temp'>Current Temp {weather?.main?.temp}</div>
      </div>
      :
      null
    }

  </div>
  </div>;
}

ReactDOM.render(<Hi />, document.querySelector('#root'));
