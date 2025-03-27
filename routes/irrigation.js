import express from 'express';
import jwt from 'jsonwebtoken';
import Irrigation from '../models/Irrigation.js';

const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Get irrigation status
router.get('/status', verifyToken, async (req, res) => {
    try {
        const irrigation = await Irrigation.findOne({ userId: req.userId });
        if (!irrigation) {
            return res.status(404).json({ message: 'Irrigation system not found' });
        }
        res.json(irrigation);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching status', error: error.message });
    }
});

// Update irrigation settings
router.put('/settings', verifyToken, async (req, res) => {
    try {
        const { moistureThreshold, maxWateringDuration } = req.body;

        const irrigation = await Irrigation.findOne({ userId: req.userId });
        if (!irrigation) {
            return res.status(404).json({ message: 'Irrigation system not found' });
        }

        irrigation.settings.moistureThreshold = moistureThreshold;
        irrigation.settings.maxWateringDuration = maxWateringDuration;

        await irrigation.save();
        res.json(irrigation);
    } catch (error) {
        res.status(500).json({ message: 'Error updating settings', error: error.message });
    }
});

// Update schedule
router.put('/schedule', verifyToken, async (req, res) => {
    try {
        const { enabled, times } = req.body;

        const irrigation = await Irrigation.findOne({ userId: req.userId });
        if (!irrigation) {
            return res.status(404).json({ message: 'Irrigation system not found' });
        }

        irrigation.schedule.enabled = enabled;
        irrigation.schedule.times = times;

        await irrigation.save();
        res.json(irrigation);
    } catch (error) {
        res.status(500).json({ message: 'Error updating schedule', error: error.message });
    }
});

// Manual control
router.post('/control', verifyToken, async (req, res) => {
    try {
        const { action } = req.body;

        const irrigation = await Irrigation.findOne({ userId: req.userId });
        if (!irrigation) {
            return res.status(404).json({ message: 'Irrigation system not found' });
        }

        if (action === 'start') {
            irrigation.status = 'active';
            irrigation.lastWatered = new Date();
        } else if (action === 'stop') {
            irrigation.status = 'inactive';
        }

        await irrigation.save();
        res.json(irrigation);
    } catch (error) {
        res.status(500).json({ message: 'Error controlling irrigation', error: error.message });
    }
});

// Update sensor data
router.post('/sensor-data', verifyToken, async (req, res) => {
    try {
        const { moistureLevel, temperature, humidity } = req.body;

        const irrigation = await Irrigation.findOne({ userId: req.userId });
        if (!irrigation) {
            return res.status(404).json({ message: 'Irrigation system not found' });
        }

        irrigation.moistureLevel = moistureLevel;
        irrigation.temperature = temperature;
        irrigation.humidity = humidity;

        await irrigation.save();
        res.json(irrigation);
    } catch (error) {
        res.status(500).json({ message: 'Error updating sensor data', error: error.message });
    }
});

export default router; 