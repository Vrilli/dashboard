import React, { useRef, useState } from 'react';
import { HiOutlineSearch } from "react-icons/hi";

const App = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [climate, setClimate] = useState({});
  const inputRef = useRef(null);

  const buscar = async (evento) => {
    if (evento.key === "Enter") {
      setLoading(true);
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=29dab4e98abedbf3cacd8aa03078a91d`);
        if (!response.ok) {
          throw new Error('Error al buscar los datos del clima');
        }
        const result = await response.json();
        setClimate(result);
        setData("");
        console.log(result);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container">
      <div className='logo'>
        <img className='img' src='https://static.vecteezy.com/system/resources/previews/025/465/385/non_2x/world-meteorological-day-tiny-people-meteorologists-studying-and-researching-weather-and-climate-condition-meteorology-science-modern-flat-cartoon-style-illustration-on-white-background-vector.jpg' alt='meteorologia' />
      </div>
      <input
        ref={inputRef}
        type="text"
        className="search"
        placeholder="Search City"
        onChange={e => setData(e.target.value)}
        value={data}
        onKeyDown={buscar}
      />

      {loading && <p>Cargando...</p>}
      {climate.main && (
        <div className="weather-data">
          <h3>Clima en {climate.name}</h3>
          <p>Temperatura: {climate.main.temp}°C</p>
          <p>Humedad: {climate.main.humidity}%</p>
          <p>Presión: {climate.main.pressure} hPa</p>
          <p>Viento: {climate.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
