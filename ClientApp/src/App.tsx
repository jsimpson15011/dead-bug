import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
    
    const [weatherForecast, setWeatherForecast] = useState({ forecasts: null, loading: false });
    
    useEffect(() => {
        const populateWeatherData  = async ()=> {
            const response = await fetch('weatherforecast');
            console.log(response)
            const data = await response.json();
            console.log(data)
            setWeatherForecast({ forecasts: data, loading: false });
        }
        populateWeatherData();
    },[]);
    
    console.log(weatherForecast.forecasts);
  return (
    <div className="App">
      <header className="App-header">
        Success!
      </header>
    </div>
  );
}

export default App;
