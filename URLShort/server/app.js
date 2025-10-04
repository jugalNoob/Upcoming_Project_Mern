const express = require('express');
const mongoose = require('mongoose');
const  router = require('./routes/router');

const app = express();
app.use(express.json());




// Routes

app.use(router); // All other API routes

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
