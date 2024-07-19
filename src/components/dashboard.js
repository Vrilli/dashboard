import React, { useEffect, useState } from 'react';



const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [climate, setClimate] = useState({});


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


  return (
    <>
      {loading ? (
        <p className='loading'>Loading...</p>
      ) : (
        <div className="container">
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
