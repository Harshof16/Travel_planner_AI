import React from 'react';

const WeatherForecast: React.FC = () => {
  const weatherData = [
    { date: '1 Jun', icon: '☀️', temperature: '29°C' },
    { date: '2 Jun', icon: '☁️', temperature: '28°C' },
    { date: '3 Jun', icon: '🌧️', temperature: '27°C' },
    { date: '4 Jun', icon: '☀️', temperature: '28°C' },
    { date: '5 Jun', icon: '☁️', temperature: '29°C' },
    { date: '6 Jun', icon: '☁️', temperature: '29°C' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Weather Forecast</h2>
      <div className="grid grid-cols-6 gap-4">
        {weatherData.map((day, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg"
          >
            <span className="text-2xl mb-2">{day.icon}</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">{day.date}</span>
            <span className="text-lg font-bold text-gray-800 dark:text-gray-200">{day.temperature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;