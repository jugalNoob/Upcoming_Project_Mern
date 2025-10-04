const express = require("express");
const http = require("http");
const { initSocket } = require("./IO/connect"); // import socket.js
const connectDB=require('./db/conn')
const router = require("./routes/router");
const cors = require('cors');
const app = express();
const PORT = 9000;
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};
const server = http.createServer(app);

app.use(cors(corsOptions));
app.use(router);



(async () => {
  initSocket(server); // initialize socket
connectDB()
  server.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
})();
