import mongoose from 'mongoose';

const irrigationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'maintenance'],
        default: 'inactive'
    },
    moistureLevel: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    temperature: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    lastWatered: {
        type: Date,
        default: null
    },
    schedule: {
        enabled: {
            type: Boolean,
            default: false
        },
        times: [{
            hour: Number,
            minute: Number,
            duration: Number // in minutes
        }]
    },
    settings: {
        moistureThreshold: {
            type: Number,
            default: 30,
            min: 0,
            max: 100
        },
        maxWateringDuration: {
            type: Number,
            default: 30, // minutes
            min: 1,
            max: 120
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
irrigationSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Irrigation = mongoose.model('Irrigation', irrigationSchema);

export default Irrigation; 