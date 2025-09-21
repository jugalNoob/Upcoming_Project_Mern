const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },       // Chat message content
    timestamp: { type: Date, default: Date.now },    // Message sent time
  },
  {
    collection: 'chat_messages',  // MongoDB collection name
  }
);

module.exports = mongoose.model('ChatMessage', chatSchema);



// const mongoose = require('mongoose');

// const chatSchema = new mongoose.Schema(
//   {
//     senderId: { type: String, required: true },      // User ID of sender
//     senderName: { type: String },                    // Optional: user's display name
//     message: { type: String, required: true },       // Chat message content
//     roomId: { type: String },                        // Optional: room/channel for group chats
//     timestamp: { type: Date, default: Date.now },    // Message sent time
//   },
//   {
//     collection: 'chat_messages',  // MongoDB collection name
//   }
// );

// module.exports = mongoose.model('ChatMessage', chatSchema);
