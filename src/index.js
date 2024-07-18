import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import NavBar from './components/navBar';
import { BrowserRouter as Router } from 'react-router-dom';
import WeatherChart from './components/weather';
import Dashboard from '../src/components/dashboard';
import Forecast from './components/forecast';
import reportWebVitals from './reportWebVitals';
import AirPollutionGraph from './components/pollution';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <NavBar />
    <Dashboard />
    <AirPollutionGraph />
    <Forecast />
    <WeatherChart />
  </Router>
);


reportWebVitals();
