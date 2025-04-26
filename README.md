# Weather-Dashboard
A responsive React.js app using OpenWeatherMap API for real-time weather. Search a city to see temperature (°C), condition, humidity, wind speed, and icon on a sleek card. Styled with Tailwind CSS, it handles loading/errors with React Hooks. Optional: recent searches, 5-day forecast, theme toggle. Mobile/desktop-ready, modular code.

I have saved the code files in master branch.

## Tech Stack

- **Frontend Framework**: React.js with Vite for fast development and optimized builds
- **Styling**: Tailwind CSS for utility-first styling and dark mode support
- **Icons**: React Icons (FiSun, FiMoon, FiRefreshCw)
- **HTTP Client**: Axios for API requests
- **State Management**: React Hooks (useState, useEffect)
- **Local Storage**: Browser's localStorage for search history persistence

## Features

- Real-time weather data display
- 5-day weather forecast
- Dark/Light theme toggle with system preference detection
- Search history with up to 5 recent searches
- Responsive design for all device sizes
- Error handling with user-friendly messages
- Automatic refresh functionality

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```env
   VITE_WEATHER_API_KEY=45dc3d3a50f5fca286cd4f4438abf2e5
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Build for production:
   ```bash
   npm run build
   ```

## API Integration

This application uses the OpenWeatherMap API for weather data:

### Endpoints Used

- Current Weather: `https://api.openweathermap.org/data/2.5/weather`
- 5-day Forecast: `https://api.openweathermap.org/data/2.5/forecast`

### API Key Configuration

- Sign up at [OpenWeatherMap](https://openweathermap.org/api) to get an API key
- Free tier limitations:
  - 60 calls/minute
  - 1,000,000 calls/month
  - Current weather and forecast data available

## License

MIT License - feel free to use this project for your own learning or development.
