const mongoose = require('mongoose');

const thirdPageDataSchema = new mongoose.Schema({
  data: [
    {
      name: {
        type: String,
        required: true
      },
      value: {
        type: Number,
        required: true
      }
    }
  ]
});

const ThirdPageData = mongoose.model('ThirdPageData', thirdPageDataSchema);

module.exports = ThirdPageData;