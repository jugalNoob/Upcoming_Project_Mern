const kafka = require('../client/client');
const connectDB = require('../db'); // your MongoDB connection
const ChatMessage = require('../models/ChatMessage'); // import chat model



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
        console.log(`📥 Received from Kafka (topic: ${topic}, partition: ${partition}):`, data);

        // Save to MongoDB
        const chat = new ChatMessage({
          message: data.message, // assuming data has a "message" field
          timestamp: data.timestamp || new Date(), // optional timestamp from Kafka or now
        });

        await chat.save();
        console.log("✅ Message saved to MongoDB:", chat);

      } catch (err) {
        console.error("❌ Error processing message:", err);
      }
    },
  });
}

runConsumer().catch((err) => {
  console.error("❌ Kafka consumer failed:", err);
});
