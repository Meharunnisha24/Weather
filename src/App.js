import React, { useState } from 'react';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null); 

  const changeHandler = (e) => {
    setCity(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d6a5590dddeeabb4f05f04b5991b7976&units=metric`)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data); 
        console.log(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Weather App</h4>
          <form onSubmit={submitHandler}>
            <input type="text" name="city" value={city} onChange={changeHandler} />

            <br /> <br />
            <input type="submit" value="Get Temperature" />
            {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
         
        </div>
      )}
          </form>
        </div>
      </div>

    </div>
  );
};

export default App;
