import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AirPollutionGraph = () => {
    const [pollutionData, setPollutionData] = useState([]);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const month = date.getMonth() + 1;
        const formattedDate = `${date.getDate()}/${month}`;
        return formattedDate;
    };


    useEffect(() => {
        const fetchData = async () => {
            const apiKey = '29dab4e98abedbf3cacd8aa03078a91d';
            const lat = 50;
            const lon = 50;
            const response = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lat}&lon=${lon}&start=1623891600&end=1626483600&appid=${apiKey}`);
            const data = await response.json();
            if (data && data.list) {
                setPollutionData(data.list);
            }
        };
        fetchData();
    }, []);


    const labels = pollutionData.map((point) => formatDate(point.dt));
    const data = {
        labels: labels,
        datasets: [
            {

                label: 'PM2.5',
                data: pollutionData.map((point) => point.components.pm2_5),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {

                label: 'PM10',
                data: pollutionData.map((point) => point.components.pm10),
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgb(255, 159, 64)',
                borderWidth: 1
            }
        ],
    };

    const options = {
        type: 'bar',
        maintainAspectRatio: false,
        responsive: true,
        aspectRatio: 0.5,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Air Pollution in the Last 3 Months',
                font: {
                    size: 25,
                    weight: 'bold'
                }
            },
        },
         scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Concentration (µg/m³)',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                },
            },
        },
        indexAxis: 'y',
    };

    return (
        <div className='pollution'>
            <Bar className='pollution-card' data={data} options={options} />
        </div>
    );
};

export default AirPollutionGraph;
