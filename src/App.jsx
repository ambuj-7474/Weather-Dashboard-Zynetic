import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { FiSun, FiMoon, FiRefreshCw } from "react-icons/fi";
import "./App.css";

function App() {
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem("searchHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [forecast, setForecast] = useState(null);

  const API_KEY = "45dc3d3a50f5fca286cd4f4438abf2e5"; // OpenWeatherMap API key
  const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
  const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const refreshWeather = () => {
    if (weatherData?.name) {
      fetchWeatherData(weatherData.name);
    }
  };

  const fetchWeatherData = async (city) => {
    if (!city.trim()) return;

    setSearchHistory((prev) => {
      const newHistory = [city, ...prev.filter((item) => item !== city)].slice(
        0,
        5
      );
      return newHistory;
    });
    setLoading(true);
    setError(null);

    try {
      console.log("Fetching weather data for:", city);
      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get(WEATHER_URL, {
          params: {
            q: city,
            appid: API_KEY,
            units: "metric",
          },
        }),
        axios.get(FORECAST_URL, {
          params: {
            q: city,
            appid: API_KEY,
            units: "metric",
          },
        }),
      ]);

      setWeatherData(weatherResponse.data);
      setForecast(forecastResponse.data);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      let errorMessage = "Failed to fetch weather data. Please try again.";

      if (err.response) {
        console.error("Error response:", err.response);
        if (err.response.status === 404) {
          errorMessage = "City not found. Please try another city.";
        } else if (err.response.status === 401) {
          errorMessage = "Invalid API key. Please check your configuration.";
        } else {
          errorMessage = `Server error: ${err.response.status}`;
        }
      } else if (err.request) {
        console.error("No response received:", err.request);
        errorMessage =
          "No response from server. Please check your internet connection.";
      } else {
        console.error("Error setting up request:", err.message);
        errorMessage = "Error setting up the request. Please try again.";
      }

      setError(errorMessage);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">
            Weather Dashboard
          </h1>
          <div className="flex gap-4">
            <button
              onClick={refreshWeather}
              disabled={loading || !weatherData}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
              title="Refresh weather"
            >
              <FiRefreshCw
                className={`w-5 h-5 text-text-light dark:text-text-dark ${
                  loading ? "animate-spin" : ""
                }`}
              />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title="Toggle theme"
            >
              {theme === "light" ? (
                <FiMoon className="w-5 h-5 text-text-light dark:text-text-dark" />
              ) : (
                <FiSun className="w-5 h-5 text-text-light dark:text-text-dark" />
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <SearchBar onSearch={fetchWeatherData} loading={loading} />
            {searchHistory.length > 0 && (
              <div className="mt-4 p-4 bg-card-light dark:bg-card-dark rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-2 text-text-light dark:text-text-dark">
                  Recent Searches
                </h3>
                <ul className="space-y-2">
                  {searchHistory.map((city, index) => (
                    <li key={index}>
                      <button
                        onClick={() => fetchWeatherData(city)}
                        className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-text-light dark:text-text-dark transition-colors"
                      >
                        {city}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="md:col-span-3">
            <WeatherCard
              weatherData={weatherData}
              forecast={forecast}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
