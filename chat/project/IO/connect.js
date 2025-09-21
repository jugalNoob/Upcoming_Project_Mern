const { Server } = require("socket.io");
const Socket_io = require("../Socket/Socket"); // import logic

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`🔥 Client connected: ${socket.id}`);

    // call your handler
    Socket_io(io, socket);

    socket.on("disconnect", () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });

  return io;
}

module.exports = { initSocket };






// ------------>>> Multi Function change User -------------------->>
// const { Server } = require("socket.io");
// const { Socket_io, startBroadcast } = require("../Socket/Socket");

// function initSocket(server) {
//   const io = new Server(server, {
//     cors: {
//       origin: "http://localhost:5173",
//       methods: ["GET", "POST"],
//       credentials: true,
//     },
//   });

//   io.on("connection", (socket) => {
//     console.log(`🔥 Client connected: ${socket.id}`);
//     Socket_io(io, socket);
//   });

//   startBroadcast(io); // run one broadcast for all clients

//   return io;
// }

// module.exports = { initSocket };
