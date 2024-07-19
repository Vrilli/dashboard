import React, { useEffect, useState } from 'react';

const WeatherChart = () => {
    const [weatherData, setWeatherData] = useState([]);

    const cities = [
        { city: 'Mountain View', state: 'CA', country: 'US' },
        { city: 'New York', state: 'NY', country: 'US' },
        { city: 'London', state: '', country: 'GB' },
        { city: 'Paris', state: '', country: 'FR' },
        { city: 'Tokyo', state: '', country: 'JP' },
        { city: 'Bogotá', state: '', country: 'CO' }
    ];

    const apiKey = 'dfd85a588173571755ca41a23f6a549d';

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const weatherDataArray = await Promise.all(cities.map(async (location) => {
                    const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location.city},${location.state},${location.country}&limit=1&appid=${apiKey}`);
                    const geoData = await geoResponse.json();
                    if (geoData.length === 0) {
                        throw new Error(`No geographic data was found for ${location.city}, ${location.state}, ${location.country}`);
                    }
                    const { lat, lon } = geoData[0];

                    const weatherResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
                    const weatherData = await weatherResponse.json();

                    return {
                        location: `${location.city}, ${location.state ? location.state + ', ' : ''}${location.country}`,
                        temperature: (weatherData.main.temp - 273.15).toFixed(2),
                        description: weatherData.weather[0].description
                    };
                }));

                setWeatherData(weatherDataArray);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, []);


    return (
        <div className='weather'>
            <h1 className='title'>Current Weather</h1>
            <div className='weather-chart'>
                <table className='table' border="1">
                    <thead>
                        <tr>
                            <th>Location</th>
                            <th>Temperature (°C)</th>
                            <th>Weather</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weatherData.map((weather, index) => (
                            <tr key={index}>
                                <td>{weather.location}</td>
                                <td>{weather.temperature}</td>
                                <td>{weather.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default WeatherChart;
