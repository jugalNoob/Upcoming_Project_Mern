const mongoose=require('mongoose')
const shortid = require('shortid'); // Import shortid library

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true }, // shard key
  shortId: { type: String, unique: true, } // auto-generate
});



const RegisterGet = new mongoose.model("restapis", userSchema)
    // Error handler function
  module.exports = RegisterGet;