// Weather service for API operations
import axios from 'axios';

const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

export const weatherService = {
  // Get coordinates from city name
  async getCoordinates(cityName) {
    try {
      const response = await axios.get(GEOCODING_API, {
        params: {
          name: cityName,
          count: 1,
          language: 'en',
          format: 'json',
        },
      });

      if (response.data.results && response.data.results.length > 0) {
        const { latitude, longitude, name, country } = response.data.results[0];
        return { latitude, longitude, name, country };
      }
      throw new Error('City not found');
    } catch (error) {
      console.error('Geocoding error:', error);
      throw error;
    }
  },

  // Get current weather and forecast
  async getWeather(latitude, longitude) {
    try {
      const response = await axios.get(WEATHER_API, {
        params: {
          latitude,
          longitude,
          current: 'temperature_2m,weather_code,wind_speed_10m,humidity',
          daily: 'temperature_2m_max,temperature_2m_min,weather_code',
          timezone: 'auto',
        },
      });

      return {
        current: response.data.current,
        daily: response.data.daily,
        timezone: response.data.timezone,
      };
    } catch (error) {
      console.error('Weather API error:', error);
      throw error;
    }
  },

  // Get complete weather data for a city
  async getWeatherByCity(cityName) {
    try {
      const coordinates = await this.getCoordinates(cityName);
      const weatherData = await this.getWeather(coordinates.latitude, coordinates.longitude);

      return {
        ...coordinates,
        weather: weatherData,
      };
    } catch (error) {
      console.error('Error getting weather by city:', error);
      throw error;
    }
  },

  // Get WMO weather code description
  getWeatherDescription(code) {
    const descriptions = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Foggy with rime',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      77: 'Snow grains',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      85: 'Slight snow showers',
      86: 'Heavy snow showers',
    };
    return descriptions[code] || 'Unknown';
  },

  // Get weather icon name
  getWeatherIcon(code) {
    if (code === 0 || code === 1) return 'sunny';
    if (code === 2 || code === 3) return 'cloud';
    if (code === 45 || code === 48) return 'cloud';
    if (code >= 51 && code <= 67) return 'rainy';
    if (code >= 80 && code <= 82) return 'rainy';
    if (code >= 85 && code <= 86) return 'snow';
    if (code >= 71 && code <= 77) return 'snow';
    return 'cloud';
  },
};

export default weatherService;