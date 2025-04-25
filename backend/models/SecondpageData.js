const mongoose = require('mongoose');

const secondPageDataSchema = new mongoose.Schema({
  data: [
    {
      name: {
        type: String,
        required: true
      },
      status: {
        type: String,
        required: true
      }
    }
  ]
});

const SecondPageData = mongoose.model('SecondPageData', secondPageDataSchema);

module.exports = SecondPageData;