const { initProducer, PostsendMessage } = require("../producer/chat_producer"); 

const Socket_io = (io, socket) => {
  // Listen for incoming chat messages from this client
  socket.on("chat message", async (msg) => { // <-- make callback async
    // console.log(`📨 Message from ${socket.id}: ${msg}`);

    // Broadcast to all connected clients
    io.emit("chat message", msg);

    // Call your async function
    try {
    let producer=  await PostsendMessage("user_ChatApp", msg);

    console.log(producer , 'jdjidi')
      console.log("✅ Message saved successfully");
    } catch (err) {
      console.error("❌ Error saving message:", err);
    }
  });
};

module.exports = Socket_io;

 initProducer()

// // socket_io.js
// let user_count = 0; // global user count

// function Socket_io(io, socket) {
//   // Increment on new connection
//   user_count++;
//   console.log("👤 Users connected:", user_count);

//   // Decrement on disconnect
//   socket.on("disconnect", () => {
//     user_count--;
//     console.log("❌ User disconnected. Users connected:", user_count);
//   });
// }

// // Single interval for broadcasting

// function startBroadcast(io) {
//   const broadcast = () => {
//     const randomNumber = Math.floor(Math.random() * 100);
//     io.emit("randomNumber", { number: randomNumber, users: user_count });
//     console.log("🔁 Broadcast to clients:", { number: randomNumber, users: user_count });
//   };

//   broadcast(); // optional: send immediately on server start
//   setInterval(broadcast, 5000);
// }

// module.exports = { Socket_io, startBroadcast };




