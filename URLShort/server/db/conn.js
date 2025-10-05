
const mongoose=require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://jugal786:jugal786@cluster0.sgg8t.mongodb.net/ones?retryWrites=true&w=majority', {
      maxPoolSize: 100,
      minPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
      useNewUrlParser: true,
      useUnifiedTopology: true,
            bufferCommands: false, // optional, or just remove if unnecessary
    });

    console.log("✅ MongoDB connected with pooling");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    // Print full error details
    console.error("Full Error Stack:", err.stack);
    process.exit(1);
  }
};


module.exports = connectDB;