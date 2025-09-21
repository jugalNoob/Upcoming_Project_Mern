const express = require("express");
const http = require("http");
const { initSocket } = require("./IO/connect"); // import socket.js

const app = express();
const server = http.createServer(app);
const PORT = 9000;

(async () => {
  initSocket(server); // initialize socket

  server.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
})();
