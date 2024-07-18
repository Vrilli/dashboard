import React, { useEffect, useState, useRef } from 'react';
import { HiOutlineSearch } from "react-icons/hi";


const Dashboard = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [climate, setClimate] = useState({});
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch("http://api.openweathermap.org/data/2.5/air_pollution?lat=50&lon=50&appid=29dab4e98abedbf3cacd8aa03078a91d");
      const data = await response.json();
      setClimate(data);
      setLoading(false);
    };
    fetchData();
  }, []);



  const buscar = async (evento) => {
    if (evento.key === "Enter") {
      setLoading(true);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?appid=29dab4e98abedbf3cacd8aa03078a91d`);
      const result = await response.json();
      setClimate(result);
      setData("");
      console.log(result);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <p className='loading'>Loading...</p>
      ) : (
        <div className="container">
          <div>
            <input
              ref={inputRef}
              type="text"
              className="search"
              placeholder="Search Fey"
              onChange={e => setData(e.target.value)}
              value={data}
              onKeyPress={buscar}
            />
            <HiOutlineSearch className="search-icon" />
          </div>

          {climate.main && (
            <div className="city">
              <h2 className="city-name">
                {climate.name}
                <sup>{climate.sys.country}</sup>
              </h2>
              <div className="city-temp">
                {Math.round(climate.main.temp)}
                <sup>&deg;C</sup>
              </div>
              <div className="info">
                <img
                  className="city-icon"
                  src={`https://openweathermap.org/img/wn/${climate.weather[0].icon}@2x.png`}
                  alt={climate.weather[0].description}
                />
                <p>{climate.weather[0].description}</p>
              </div>
            </div>
          )}

        </div>
      )}
    </>
  );
}

export default Dashboard;
