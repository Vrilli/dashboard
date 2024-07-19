import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Forecast = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=dfd85a588173571755ca41a23f6a549d'
        );
        const data = await response.json();
        const filteredData = data.list.filter((item, index) => index % 8 === 0);

        const labels = filteredData.map(item => new Date(item.dt_txt).toLocaleDateString());
        const temperatures = filteredData.map(item => (item.main.temp - 273.15).toFixed(2));
        const precipitation = filteredData.map(item => item.pop * 100);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Temperature (°C)',
              data: temperatures,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              yAxisID: 'y1',
            },
            {
              label: 'Precipitation Probability (%)',
              data: precipitation,
              borderColor: 'rgba(153, 102, 255, 1)',
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              type: 'bar',
              yAxisID: 'y2',
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching the weather data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Forecast">
      <h1 className='title'>Weather Forecast for the Next 5 Days</h1>
      <div className='forecast-container'>

        {chartData && (
          <div className='forecast-card'>
            <Line
              data={chartData}
              options={{
                responsive: true,
                scales: {
                  y1: {
                    type: 'linear',
                    position: 'left',
                    title: {
                      display: true,
                      text: 'Temperature (°C)',
                    },
                  },
                  y2: {
                    type: 'linear',
                    position: 'right',
                    title: {
                      display: true,
                      text: 'Precipitation Probability (%)',
                    },
                    grid: {
                      drawOnChartArea: false,
                    },
                  }
                }
              }}
            />
          </div>
        )}

      </div>

    </div>
  );
};

export default Forecast;
