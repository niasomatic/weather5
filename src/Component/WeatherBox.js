import React from 'react'

const WeatherBox = ({weather}) => {
  console.log("weather?", weather);
  
  return (
    <div class="Weather-box" >
      <h2>{weather?.name}</h2>
      <div>{weather?.main.temp}c</div>
      <div>{weather?.weather[0].description}</div>
    </div>
  )
}

export default WeatherBox
