import { useState } from 'react';
import './App.css';
import Form from './components/Form';
import Result from './components/Result';
import Title from './components/Title';

type WeatherResultType = {
  country: string;
  cityName: string;
  tempurature: string;
  condition: string;
  icon: string;
};

function App() {
  const [result, setResult] = useState<WeatherResultType>({
    country: "",
    cityName: "",
    tempurature: "",
    condition: "",
    icon: ""
  });

  function handleGetWeather(city: string): void {
    const url = `https://api.weatherapi.com/v1/current.json?key=db42010fdad84b42892143742232102&q=${city}&aqi=no`;

    fetch(url).then((res) => res.json())
      .then((data) => setResult({
        country: data.location.country,
        cityName: data.location.name,
        tempurature: data.current.temp_c,
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
      }));
  }

  return (
    <div className='wrapper'>
      <div className="container">
        <Title />
        <Form onGetWeather={handleGetWeather} />
        <Result results={result} />
      </div>
    </div>
  );
}

export default App;
