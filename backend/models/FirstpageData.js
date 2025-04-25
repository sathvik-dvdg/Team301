const mongoose = require('mongoose');

const firstPageDataSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const FirstPageData = mongoose.model('FirstPageData', firstPageDataSchema);

module.exports = FirstPageData;