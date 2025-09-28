// chat_producer.js
const kafka = require("../Client/clinet"); // Kafka instance from client.js

let producer;

async function initProducer() {
  try {
    producer = kafka.producer();
    await producer.connect();
    console.log("✅ Kafka Producer connected post data");
  } catch (error) {
    console.error("❌ Kafka init error:", error.message);
  }
}


async function PostsendMessage(topic, msg) {
  if (!producer) throw new Error("Kafka producer is not initialized.");

  const payload = {
    message: msg,
    timestamp: new Date(),
  };

  const result = await producer.send({
    topic,
    messages: [{ value: JSON.stringify(payload) }],
  });

  console.log(`📩 Sent to "${topic}":`, payload);
  return result;
}


async function disconnectProducer() {
  try {
    if (producer) {
      await producer.disconnect();
      console.log("✅ Kafka Producer disconnected");
    }
  } catch (error) {
    console.error("❌ Disconnect error:", error.message);
  }
}

process.on("SIGINT", async () => {
  await disconnectProducer();
  process.exit(0);
});

module.exports = { initProducer, PostsendMessage };
