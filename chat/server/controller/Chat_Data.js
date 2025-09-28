const ChatMessage = require("./model/student");
const redisClient = require("../redis/redisClient"); // ✅ fix
const CryptoJS = require("crypto-js");
// GET all chat messages
exports.Get_Chat = async (req, res) => {
  try {
    const TTL = 20; // Redis TTL in seconds
    const cacheKey = "chat:messages"; // unique key for caching

    // 1️⃣ Check Redis first
    const cachedMessages = await redisClient.get(cacheKey);
    if (cachedMessages) {
      console.log("✅ Cache hit");
      return res.json(JSON.parse(cachedMessages));
    }

    console.log("❌ Cache miss - fetching from MongoDB");

    // 2️⃣ Fetch from MongoDB if not cached
    const messages = await ChatMessage.find().sort({ createdAt: 1 });

    // 3️⃣ Store result in Redis
    await redisClient.setEx(cacheKey, TTL, JSON.stringify(messages));

    // Decrypt

    let messageS='secret key 123'

const    bytes  = CryptoJS.AES.decrypt(messages, messageS );
const originalText = bytes.toString(CryptoJS.enc.Utf8);


    res.json(originalText );
  } catch (err) {
    console.error("❌ Error in Get_Chat:", err);
    res.status(500).json({ message: "Server error" });
  }
};
