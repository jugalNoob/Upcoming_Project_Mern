const express = require("express");
const bodyParser = require("body-parser");
const shortid = require("shortid");
const setupSharding=require('./db/conn')

const connectDB = require("./db/conn");
const RegisterGet = require("./model/student");

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(express.json());

// POST API to insert data
app.post("/users", async (req, res) => {
  try {
    // Destructure request body
    const { name, email } = req.body;

    // Generate unique shortId
    const generatedShortId = shortid.generate();

    // Create new user
    const user = new RegisterGet({ name, email, shortId: generatedShortId });
    const savedUser = await user.save();

    console.log(savedUser);
    res.json({ message: "User added successfully", user: savedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// GET API to fetch users by email and see shard targeting

// GET API to fetch users by email and see shard targeting
// GET API to fetch a user by email + explain
app.get("/users/email", async (req, res) => {
  try {
    const emailQuery = req.query.email; // pick email from query string
    if (!emailQuery) return res.status(400).json({ error: "Email is required" });

    const explainResult = await RegisterGet.find({ email: emailQuery }).explain("executionStats");

    res.json(explainResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});





// GET API to fetch shard stats
app.get("/users/stats", async (req, res) => {
  try {
    const stats = await RegisterGet.aggregate([
      { $collStats: { storageStats: {} } }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});





// Connect DB and start server
connectDB();

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
