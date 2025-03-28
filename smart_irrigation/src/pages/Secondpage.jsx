import "../Styles/Secondpage.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { cropData } from "../data/cropData";

export default function Secondpage() {
  const location = useLocation();
  const formData = location.state || {};
  const [recommendedCrops, setRecommendedCrops] = useState([]);
  const [currentTemp, setCurrentTemp] = useState(null);
  const [avgTemp, setAvgTemp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch weather data and calculate recommendations
    const fetchWeatherData = async () => {
      try {
        // For now, using example temperature
        setCurrentTemp(25);
        setAvgTemp(23);
        
        // Calculate recommendations
        const recommendations = findRecommendedCrops(formData);
        setRecommendedCrops(recommendations);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [formData]);

  const findRecommendedCrops = (soilData) => {
    return cropData
      .map(crop => {
        const moistureMatch = isInRange(soilData.moisture, crop.moisture.min, crop.moisture.max);
        const phMatch = isInRange(soilData.ph, crop.ph.min, crop.ph.max);
        const nitrogenMatch = isInRange(soilData.nitrogen, crop.nitrogen.min, crop.nitrogen.max);
        const phosphorousMatch = isInRange(soilData.phosphorous, crop.phosphorous.min, crop.phosphorous.max);
        const potassiumMatch = isInRange(soilData.potassium, crop.potassium.min, crop.potassium.max);
        const temperatureMatch = isInRange(currentTemp, crop.temperature.min, crop.temperature.max);

        const accuracy = (
          (moistureMatch + phMatch + nitrogenMatch + phosphorousMatch + potassiumMatch + temperatureMatch) / 6
        ) * 100;

        return {
          ...crop,
          accuracy
        };
      })
      .filter(crop => crop.accuracy >= 30) // Filter out crops with accuracy less than 30%
      .sort((a, b) => b.accuracy - a.accuracy)
      .slice(0, 3); // Get top 3 recommendations
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
            <h2>Coordinates</h2>
            <p>Location: {formData.location || "Not specified"}</p>
          </div>
          <div className="box2">
            <h2>Temperature</h2>
            <p>Current Temperature: {currentTemp}°C</p>
            <p>Average Temperature: {avgTemp}°C</p>
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
          {loading ? (
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
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-crops">No crop recommendations available for the given soil conditions.</div>
          )}
        </div>
      </div>
    </div>
  );
}
