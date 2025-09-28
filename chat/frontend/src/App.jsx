import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:9000"); // your backend Socket.IO server

function ChatClient() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // 1️⃣ Fetch old messages from MongoDB
    const fetchOldMessages = async () => {
      try {
        const res = await fetch("http://localhost:9000/api/chat"); // your API endpoint
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };
    fetchOldMessages();

    // 2️⃣ Listen for new messages via Socket.IO
    socket.on("chat message", (msg) => {
      // Convert live message to match MongoDB schema
      const newMsg = { message: msg.text || msg, timestamp: msg.timestamp || Date.now() };
      setMessages((prev) => [...prev, newMsg]);
    });

    return () => socket.off("chat message");
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send message via Socket.IO
  const sendMessage = () => {
    if (!input.trim()) return;
    // Send as object to include timestamp
    socket.emit("chat message", { text: input, timestamp: Date.now() });
    setInput("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "500px", margin: "auto" }}>
      <h2>💬 Chat App</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "300px",
          overflowY: "scroll",
          marginBottom: "10px",
          backgroundColor: "#000000ff",
        }}
      >
        {messages.map((msg) => (
          <div key={msg._id || msg.timestamp} style={{ padding: "5px 0", borderBottom: "1px solid #eee" }}>
            {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type a message..."
        style={{ width: "80%", marginRight: "10px", padding: "5px" }}
      />
      <button onClick={sendMessage} style={{ padding: "5px 10px" }}>
        Send
      </button>
    </div>
  );
}

export default ChatClient;
