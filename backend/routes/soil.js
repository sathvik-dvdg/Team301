import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import axios from 'axios';
import mongoose from 'mongoose';

const router = express.Router();

// Crop conditions database (copied from the AWS Lambda function)
const CROP_CONDITIONS = {
    "Wheat": { "pH": [6.0, 7.5], "N": [50, 120], "P": [25, 60], "K": [30, 90], "moisture": [20, 50], "temperature": [15, 30] },
    "Rice": { "pH": [5.5, 7.0], "N": [80, 150], "P": [30, 60], "K": [40, 100], "moisture": [30, 70], "temperature": [25, 35] },
    // ... (add all other crops from the original data)
};

// Weather API configuration
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Create Soil Data Schema
const soilDataSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    location: {
        latitude: Number,
        longitude: Number
    },
    soilData: {
        pH: Number,
        moisture: Number,
        nitrogen: Number,
        phosphorus: Number,
        potassium: Number,
        temperature: Number
    },
    weatherData: {
        temperature: Number,
        humidity: Number,
        weather: String,
        description: String,
        windSpeed: Number,
        rainfall: Number
    },
    suitableCrops: [String],
    irrigationRecommendation: {
        shouldIrrigate: Boolean,
        reason: String,
        duration: Number,
        nextCheck: Date
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const SoilData = mongoose.model('SoilData', soilDataSchema);

// Get weather data based on coordinates
async function getWeatherData(latitude, longitude) {
    try {
        const response = await axios.get(WEATHER_API_URL, {
            params: {
                lat: latitude,
                lon: longitude,
                appid: WEATHER_API_KEY,
                units: 'metric'
            }
        });

        return {
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            weather: response.data.weather[0].main,
            description: response.data.weather[0].description,
            windSpeed: response.data.wind.speed,
            rainfall: response.data.rain ? response.data.rain['1h'] : 0
        };
    } catch (error) {
        console.error('Weather API error:', error);
        throw new Error('Failed to fetch weather data');
    }
}

// POST endpoint for soil analysis
router.post('/analyze', verifyToken, async (req, res) => {
    try {
        const {
            latitude,
            longitude,
            pH,
            moisture,
            nitrogen,
            phosphorus,
            potassium,
            temperature
        } = req.body;

        // Validate required fields
        const requiredFields = ['latitude', 'longitude', 'pH', 'moisture', 'nitrogen', 'phosphorus', 'potassium', 'temperature'];
        for (const field of requiredFields) {
            if (!(field in req.body)) {
                return res.status(400).json({
                    status: 'failed',
                    error: `Missing required field: ${field}`
                });
            }
        }

        // Get real-time weather data
        const weatherData = await getWeatherData(latitude, longitude);

        // Combine soil and weather data for analysis
        const soilData = {
            pH: parseFloat(pH),
            moisture: parseFloat(moisture),
            nitrogen: parseFloat(nitrogen),
            phosphorus: parseFloat(phosphorus),
            potassium: parseFloat(potassium),
            temperature: weatherData.temperature // Use real-time temperature
        };

        // Find suitable crops
        const suitableCrops = [];
        for (const [crop, conditions] of Object.entries(CROP_CONDITIONS)) {
            if (
                conditions.pH[0] <= soilData.pH && soilData.pH <= conditions.pH[1] &&
                conditions.moisture[0] <= soilData.moisture && soilData.moisture <= conditions.moisture[1] &&
                conditions.temperature[0] <= soilData.temperature && soilData.temperature <= conditions.temperature[1] &&
                conditions.N[0] <= soilData.nitrogen && soilData.nitrogen <= conditions.N[1] &&
                conditions.P[0] <= soilData.phosphorus && soilData.phosphorus <= conditions.P[1] &&
                conditions.K[0] <= soilData.potassium && soilData.potassium <= conditions.K[1]
            ) {
                suitableCrops.push(crop);
            }
        }

        // Generate irrigation recommendations based on weather
        const irrigationRecommendation = generateIrrigationRecommendation(weatherData, soilData);

        // Create and save soil data record in MongoDB
        const soilRecord = new SoilData({
            userId: req.userId,
            location: { latitude, longitude },
            soilData,
            weatherData,
            suitableCrops,
            irrigationRecommendation
        });

        await soilRecord.save();

        // Send response
        res.status(200).json({
            status: 'success',
            timestamp: new Date().toISOString(),
            message: 'Analysis completed successfully',
            data: {
                soil_conditions: soilData,
                weather_conditions: weatherData,
                suitable_crops: suitableCrops,
                irrigation_recommendation: irrigationRecommendation
            }
        });

    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({
            status: 'failed',
            error: error.message || 'Error analyzing data'
        });
    }
});

// GET endpoint to retrieve soil analysis history
router.get('/history', verifyToken, async (req, res) => {
    try {
        const history = await SoilData.find({ userId: req.userId })
            .sort({ timestamp: -1 })
            .limit(10);

        res.json({
            status: 'success',
            data: history
        });
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            error: error.message
        });
    }
});

// Helper function to generate irrigation recommendations
function generateIrrigationRecommendation(weatherData, soilData) {
    let recommendation = {
        shouldIrrigate: false,
        reason: '',
        duration: 0, // minutes
        nextCheck: new Date(Date.now() + 6 * 3600000) // 6 hours from now
    };

    // Check weather conditions
    if (weatherData.weather === 'Rain') {
        recommendation.shouldIrrigate = false;
        recommendation.reason = 'Natural rainfall detected';
        recommendation.nextCheck = new Date(Date.now() + 2 * 3600000); // Check again in 2 hours
    }
    // Check soil moisture
    else if (soilData.moisture < 30) {
        recommendation.shouldIrrigate = true;
        recommendation.reason = 'Low soil moisture';
        recommendation.duration = 30;
    }
    // Check temperature
    else if (weatherData.temperature > 30 && soilData.moisture < 40) {
        recommendation.shouldIrrigate = true;
        recommendation.reason = 'High temperature conditions';
        recommendation.duration = 20;
    }

    return recommendation;
}

// Get weather history endpoint
router.get('/weather-history', verifyToken, async (req, res) => {
    try {
        const { latitude, longitude, days = 7 } = req.query;

        // Fetch historical weather data (you'll need a different API endpoint for this)
        // This is a placeholder for demonstration
        const weatherHistory = await SoilData.find({
            userId: req.userId,
            'location.latitude': latitude,
            'location.longitude': longitude
        })
            .sort({ timestamp: -1 })
            .limit(days);

        res.json({
            status: 'success',
            data: weatherHistory
        });

    } catch (error) {
        res.status(500).json({
            status: 'failed',
            error: error.message
        });
    }
});

export default router; 
