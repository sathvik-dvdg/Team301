import "../Styles/Secondpage.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { cropData } from "../data/cropData";

export default function Secondpage() {
  const location = useLocation();
  const formData = location.state || {};
  const [recommendedCrops, setRecommendedCrops] = useState([]);
  const [weatherData, setWeatherData] = useState({
    currentTemp: null,
    avgTemp: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const API_KEY = '2ea24c536580475a98731102252803';
        const city = formData.location;

        // Fetch current weather and forecast in one call
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=no`
        );
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error.message || 'Failed to fetch weather data');
        }

        // Get current temperature
        const currentTemp = data.current.temp_c;

        // Calculate average temperature from forecast
        const avgTemperature = data.forecast.forecastday.reduce((sum, day) => {
          return sum + day.day.avgtemp_c;
        }, 0) / data.forecast.forecastday.length;

        setWeatherData({
          currentTemp: Math.round(currentTemp),
          avgTemp: Math.round(avgTemperature),
          loading: false,
          error: null
        });

        // Calculate recommendations with actual temperature
        const recommendations = findRecommendedCrops(formData, currentTemp);
        setRecommendedCrops(recommendations);

      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeatherData({
          currentTemp: null,
          avgTemp: null,
          loading: false,
          error: `Failed to fetch weather data: ${error.message}`
        });
      }
    };

    if (formData.location) {
      fetchWeatherData();
    }
  }, [formData]);


  const findRecommendedCrops = (soilData, temperature) => {
    return cropData
      .map(crop => {
        const moistureMatch = isInRange(soilData.moisture, crop.moisture.min, crop.moisture.max);
        const phMatch = isInRange(soilData.ph, crop.ph.min, crop.ph.max);
        const nitrogenMatch = isInRange(soilData.nitrogen, crop.nitrogen.min, crop.nitrogen.max);
        const phosphorousMatch = isInRange(soilData.phosphorous, crop.phosphorous.min, crop.phosphorous.max);
        const potassiumMatch = isInRange(soilData.potassium, crop.potassium.min, crop.potassium.max);
        const temperatureMatch = isInRange(temperature, crop.temperature.min, crop.temperature.max);

        const accuracy = (
          (moistureMatch + phMatch + nitrogenMatch + phosphorousMatch + potassiumMatch + temperatureMatch) / 6
        ) * 100;

        return {
          ...crop,
          accuracy: Math.round(accuracy)
        };
      })
      .filter(crop => crop.accuracy >= 30)
      .sort((a, b) => b.accuracy - a.accuracy)
      .slice(0, 3);
  };

  const isInRange = (value, min, max) => {
    const numValue = Number(value);
    return numValue >= min && numValue <= max ? 1 : 0;
  };

  return (
    <div className="second-page">
      <div className="container">
        <div className="top">
          <div className="box1">
            <h2>Location Details</h2>
            <p>Location: {formData.location || "Not specified"}</p>
          </div>
          <div className="box2">
            <h2>Temperature</h2>
            {weatherData.loading ? (
              <p>Loading temperature data...</p>
            ) : weatherData.error ? (
              <p className="error">{weatherData.error}</p>
            ) : (
              <>
                <p>Current Temperature: {weatherData.currentTemp}°C</p>
                <p> Average: {weatherData.avgTemp}°C</p>
              </>
            )}
          </div>
        </div>

        <div className="bot">
          <h2>Soil Information</h2>
          <div className="soil">
            <p>Soil moisture:</p>
            <p>{formData.moisture}%</p>
          </div>
          <div className="soil">
            <p>pH level:</p>
            <p>{formData.ph}</p>
          </div>
          <div className="soil">
            <p>Nitrogen Content:</p>
            <p>{formData.nitrogen} kg/ha</p>
          </div>
          <div className="soil">
            <p>Phosphorous Content:</p>
            <p>{formData.phosphorous} kg/ha</p>
          </div>
          <div className="soil">
            <p>Potassium Content:</p>
            <p>{formData.potassium} kg/ha</p>
          </div>
        </div>

        <div className="recommendations">
          <h2>Best Crops for Your Soil</h2>
          {weatherData.loading ? (
            <div className="loading">Loading recommendations...</div>
          ) : recommendedCrops.length > 0 ? (
            <div className="crop-list">
              {recommendedCrops.map((crop, index) => (
                <div key={index} className="crop-card">
                  <h3>{crop.name}</h3>
                  <p>{crop.description}</p>
                  <div className="crop-requirements">
                    <p>Required Conditions:</p>
                    <ul>
                      <li>Moisture: {crop.moisture.min}% - {crop.moisture.max}%</li>
                      <li>pH: {crop.ph.min} - {crop.ph.max}</li>
                      <li>Temperature: {crop.temperature.min}°C - {crop.temperature.max}°C</li>
                      <li>Nitrogen: {crop.nitrogen.min} - {crop.nitrogen.max} kg/ha</li>
                      <li>Phosphorous: {crop.phosphorous.min} - {crop.phosphorous.max} kg/ha</li>
                      <li>Potassium: {crop.potassium.min} - {crop.potassium.max} kg/ha</li>
                    </ul>
                    {/* <p className="accuracy">Match Accuracy: {crop.accuracy}%</p> */}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-crops">No crop recommendations available for the given conditions.</div>
          )}
        </div>
      </div>
    </div>
  );
}
