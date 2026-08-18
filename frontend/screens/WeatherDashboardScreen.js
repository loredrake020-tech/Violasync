import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';

const WeatherDashboardScreen = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('London');
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState(null);

  // Free weather API (Open-Meteo - No API key required)
  const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';
  const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const getCoordinates = async (cityName) => {
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
      return null;
    } catch (err) {
      console.error('Geocoding error:', err);
      throw new Error('Failed to find city');
    }
  };

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);

    try {
      const coordinates = await getCoordinates(cityName);

      if (!coordinates) {
        setError('City not found');
        setLoading(false);
        return;
      }

      const response = await axios.get(WEATHER_API, {
        params: {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          current: 'temperature_2m,weather_code,wind_speed_10m,humidity',
          daily: 'temperature_2m_max,temperature_2m_min,weather_code',
          timezone: 'auto',
        },
      });

      setCity(coordinates.name);
      setWeather({
        ...response.data.current,
        location: `${coordinates.name}, ${coordinates.country}`,
      });

      // Format forecast data
      const forecastData = response.data.daily.time.slice(0, 7).map((date, index) => ({
        date,
        tempMax: response.data.daily.temperature_2m_max[index],
        tempMin: response.data.daily.temperature_2m_min[index],
        code: response.data.daily.weather_code[index],
      }));

      setForecast(forecastData);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather');
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      fetchWeather(searchInput);
      setSearchInput('');
    } else {
      Alert.alert('Error', 'Please enter a city name');
    }
  };

  const getWeatherIcon = (code) => {
    // WMO Weather interpretation codes
    if (code === 0 || code === 1) return 'sunny';
    if (code === 2 || code === 3) return 'cloud';
    if (code === 45 || code === 48) return 'cloud';
    if (code >= 51 && code <= 67) return 'rainy';
    if (code >= 80 && code <= 82) return 'rainy';
    if (code >= 85 && code <= 86) return 'snow';
    if (code >= 71 && code <= 77) return 'snow';
    return 'cloud';
  };

  const getWeatherDescription = (code) => {
    const descriptions = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Foggy',
      51: 'Drizzle',
      53: 'Drizzle',
      55: 'Drizzle',
      61: 'Rain',
      63: 'Rain',
      65: 'Rain',
      71: 'Snow',
      73: 'Snow',
      75: 'Snow',
      77: 'Snow',
      80: 'Showers',
      81: 'Showers',
      82: 'Showers',
      85: 'Snow showers',
      86: 'Snow showers',
    };
    return descriptions[code] || 'Unknown';
  };

  if (loading && !weather) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Search Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search city..."
            placeholderTextColor="#999"
            value={searchInput}
            onChangeText={setSearchInput}
            onSubmitEditing={handleSearch}
          />
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {weather && (
        <>
          {/* Current Weather Section */}
          <View style={styles.currentWeatherBox}>
            <Text style={styles.location}>{weather.location}</Text>

            <View style={styles.mainWeatherContainer}>
              <View style={styles.temperatureSection}>
                <Text style={styles.temperature}>
                  {Math.round(weather.temperature_2m)}°C
                </Text>
                <Text style={styles.description}>
                  {getWeatherDescription(weather.weather_code)}
                </Text>
              </View>

              <View style={styles.weatherIconContainer}>
                <Ionicons
                  name={getWeatherIcon(weather.weather_code)}
                  size={80}
                  color="#FF9500"
                />
              </View>
            </View>

            {/* Weather Details */}
            <View style={styles.detailsGrid}>
              <View style={styles.detailBox}>
                <Ionicons name="water" size={24} color="#007AFF" />
                <Text style={styles.detailLabel}>Humidity</Text>
                <Text style={styles.detailValue}>{weather.humidity}%</Text>
              </View>

              <View style={styles.detailBox}>
                <Ionicons name="wind" size={24} color="#007AFF" />
                <Text style={styles.detailLabel}>Wind Speed</Text>
                <Text style={styles.detailValue}>{weather.wind_speed_10m} km/h</Text>
              </View>

              <View style={styles.detailBox}>
                <Ionicons name="compass" size={24} color="#007AFF" />
                <Text style={styles.detailLabel}>Temperature</Text>
                <Text style={styles.detailValue}>{Math.round(weather.temperature_2m)}°</Text>
              </View>
            </View>
          </View>

          {/* 7-Day Forecast */}
          <View style={styles.forecastSection}>
            <Text style={styles.forecastTitle}>7-Day Forecast</Text>

            {forecast.map((day, index) => (
              <View key={index} style={styles.forecastItem}>
                <Text style={styles.forecastDate}>
                  {new Date(day.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </Text>

                <View style={styles.forecastWeatherIcon}>
                  <Ionicons
                    name={getWeatherIcon(day.code)}
                    size={24}
                    color="#FF9500"
                  />
                </View>

                <Text style={styles.forecastDescription}>
                  {getWeatherDescription(day.code)}
                </Text>

                <View style={styles.forecastTemperatures}>
                  <Text style={styles.tempMax}>{Math.round(day.tempMax)}°</Text>
                  <Text style={styles.tempMin}>{Math.round(day.tempMin)}°</Text>
                </View>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 16,
  },
  searchSection: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 20,
    gap: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
  },
  searchButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorBox: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  errorText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  currentWeatherBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  location: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  mainWeatherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  temperatureSection: {
    flex: 1,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  weatherIconContainer: {
    alignItems: 'center',
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingTop: 15,
  },
  detailBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  detailLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginTop: 4,
  },
  forecastSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  forecastTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 15,
  },
  forecastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  forecastDate: {
    width: 80,
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  forecastWeatherIcon: {
    width: 40,
    alignItems: 'center',
  },
  forecastDescription: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  forecastTemperatures: {
    flexDirection: 'row',
    width: 60,
    justifyContent: 'space-between',
  },
  tempMax: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  tempMin: {
    fontSize: 14,
    color: '#999',
  },
});

export default WeatherDashboardScreen;