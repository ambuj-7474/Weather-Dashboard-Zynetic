import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiDroplet, FiWind, FiThermometer } from "react-icons/fi";

const groupForecastByDay = (forecastList) => {
  return forecastList.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});
};

const WeatherCard = ({ weatherData, forecast, loading, error }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  if (loading) {
    return (
      <motion.div
        className="weather-card flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="w-8 h-8 border-4 border-primary-light dark:border-primary-dark border-t-transparent rounded-full animate-spin" />
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="weather-card bg-card-light dark:bg-card-dark"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-red-500 dark:text-red-400 text-center">{error}</p>
      </motion.div>
    );
  }

  if (!weatherData) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="weather-card bg-card-light dark:bg-card-dark">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">
              {weatherData.name}
            </h2>
            <div className="text-5xl font-bold text-primary-light dark:text-primary-dark my-4">
              {Math.round(weatherData.main.temp)}°C
            </div>
            <p className="text-lg text-text-light dark:text-text-dark capitalize">
              {weatherData.weather[0].description}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <FiDroplet className="w-6 h-6 text-primary-light dark:text-primary-dark mb-2" />
              <span className="text-sm text-text-light dark:text-text-dark">
                Humidity
              </span>
              <span className="font-medium text-text-light dark:text-text-dark">
                {weatherData.main.humidity}%
              </span>
            </div>
            <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <FiWind className="w-6 h-6 text-primary-light dark:text-primary-dark mb-2" />
              <span className="text-sm text-text-light dark:text-text-dark">
                Wind
              </span>
              <span className="font-medium text-text-light dark:text-text-dark">
                {weatherData.wind.speed} km/h
              </span>
            </div>
            <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <FiThermometer className="w-6 h-6 text-primary-light dark:text-primary-dark mb-2" />
              <span className="text-sm text-text-light dark:text-text-dark">
                Feels Like
              </span>
              <span className="font-medium text-text-light dark:text-text-dark">
                {Math.round(weatherData.main.feels_like)}°C
              </span>
            </div>
          </div>
        </div>

        {forecast && (
          <motion.div
            className="weather-card bg-card-light dark:bg-card-dark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-text-light dark:text-text-dark">
              5-Day Forecast
            </h3>
            <div className="space-y-4">
              <div className="flex overflow-x-auto gap-2 pb-2">
                {Object.entries(groupForecastByDay(forecast.list)).map(
                  ([date, items], dayIndex) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDay(dayIndex)}
                      className={`flex-shrink-0 px-4 py-2 rounded-lg transition-colors ${
                        dayIndex === selectedDay
                          ? "bg-primary-light dark:bg-primary-dark text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {new Date(items[0].dt * 1000).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </button>
                  )
                )}
              </div>

              <div className="relative">
                <div className="overflow-x-auto pb-4">
                  <div className="flex gap-4">
                    {Object.entries(groupForecastByDay(forecast.list))[
                      selectedDay
                    ][1].map((item, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 w-32 p-3 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-all hover:transform hover:scale-105"
                      >
                        <div className="text-center mb-2">
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {new Date(item.dt * 1000).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "numeric",
                                hour12: true,
                              }
                            )}
                          </p>
                        </div>
                        <div className="flex items-center justify-center mb-2">
                          <img
                            src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                            alt={item.weather[0].description}
                            className="w-12 h-12"
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-primary-light dark:text-primary-dark">
                            {Math.round(item.main.temp)}°C
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize truncate">
                            {item.weather[0].description}
                          </p>
                          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                            <p>💧 {item.main.humidity}%</p>
                            <p>💨 {Math.round(item.wind.speed)} km/h</p>
                            {item.rain && <p>🌧️ {item.rain["3h"]}mm</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default WeatherCard;
