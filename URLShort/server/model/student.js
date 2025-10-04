const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true
  },

  
  shortUrl: {
    type: String,
    required: true,
    unique: true
  }
});

let Register=mongoose.model('Url', urlSchema);
module.exports =Register;
