import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import WeatherBox from './Component/WeatherBox';
import WeatherButton from './Component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(true);
  const cities = ['Paris', 'New York', 'Fukuoka', 'Stockholm'];

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getWeatherByCurrentLocation(lat, lon);
        console.log("Latitude:", lat, "Longitude:", lon);
      },
      (error) => {
        console.error("Error getting location:", error.message);
        setLoading(false); // Stop loader if there's an error
      }
    );
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=cadc7b126e6864aac70695ad1720c09a&units=metric`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
      const data = await response.json();
      setWeather(data);
      setLoading(false); // Stop loader after data is fetched
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
      setLoading(false); // Stop loader on error
    }
  };

  const getWeatherByCity = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cadc7b126e6864aac70695ad1720c09a&units=metric`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
      const data = await response.json();
      setWeather(data);
      setLoading(false); // Stop loader after data is fetched
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
      setLoading(false); // Stop loader on error
    }
  };

  useEffect(() => {
    if (city === '') {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div>
      <div className="container no-points">
        {loading ? (
          <ClipLoader color={"#f88c6b"} loading={loading} size={150} />
        ) : (
          <>
            <WeatherBox weather={weather} />
            <WeatherButton cities={cities} setCity={setCity} />
          </>
        )}
        <div>
          <p> ^-^/ </p>
        </div>
      </div>
    </div>
  );
}

export default App;
