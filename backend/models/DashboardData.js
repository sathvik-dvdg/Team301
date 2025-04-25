const mongoose = require('mongoose');

const dashboardDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  water_level: {
    type: Number,
    required: true
  }
});

const DashboardData = mongoose.model('DashboardData', dashboardDataSchema);

module.exports = DashboardData;