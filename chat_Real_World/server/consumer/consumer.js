const kafka = require('../Client/clinet');
const connectDB = require('../db/conn');
const ChatMessage = require('../model/student');

const KeyMessage=require('../SecretKey/Key')

// const io = require('../socket'); // <-- Uncomment if using socket.io
const CryptoJS = require("crypto-js");
async function runConsumer() {
  await connectDB();

  const consumer = kafka.consumer({ groupId: 'random-group' });
  await consumer.connect();
  console.log("✅ Kafka Consumer connected");

  await consumer.subscribe({ topic: 'user_ChatApp', fromBeginning: false });
  console.log("✅ Subscribed to topic: user_ChatApp");

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const data = JSON.parse(message.value.toString());
        console.log(`📥 Received (partition ${partition}):`, data);

        // Normalize message and timestamp
        const messageContent = typeof data.message === 'string' 
          ? data.message 
          : data.message?.text || '';
          
        const messageTimestamp = data.message?.timestamp 
          ? new Date(data.message.timestamp) 
          : new Date();


  // Encrypt
// let messageS='secret key 123'
var messgaeEncrpt = CryptoJS.AES.encrypt( messageContent,KeyMessage ).toString();

        // Save to MongoDB
        const chat = new ChatMessage({
          message: messgaeEncrpt,
          timestamp: messageTimestamp,
        });




        await chat.save();
        console.log("✅ Message saved to MongoDB:", chat);

        // Emit to clients via Socket.io
        // io.emit("chat message", chat);

      } catch (err) {
        console.error("❌ Error processing message:", err);
      }
    },
  });
}

runConsumer();
