// models/Register.js
const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
  {
    longUrls: [
      {
        longUrl: {
          type: String,
          required: true
        },
        nameUrl: {
          type: String,
          required: true
        }
      }
    ],

    shortUrls: [
      {
        shortUrl: {
          type: String,
          required: true,
          unique: true
        },
        nameShortUrl: {
          type: String,
          required: true
        }
      }
    ],

    shortCode: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);



let Register=mongoose.model('Urls', urlSchema);
module.exports =Register;
