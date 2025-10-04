🧠 Mini Project: URL Shortener with Click Tracking Dashboard
📌 Project Idea

Build a URL shortener that not only creates short links but also tracks every click.
Marketers or users can create short links → share them → later view how many people clicked, from where, and when.

🧭 Features

✍️ Create Short URL

User enters a long URL → system generates a short URL.

Save in MongoDB.

🌐 Redirect to Original URL

When short URL is clicked, redirect to original URL.

Record click info (timestamp, IP, browser, device).

📊 Analytics Dashboard

Show total clicks

Show clicks by date (daily chart)

Show top browsers or locations (basic level)

🔐 (Optional) User Accounts

Users can log in to manage their short links.

🏗️ Tech Stack

Frontend: HTML / CSS / JS (or React if you want advanced)

Backend: Node.js + Express

Database: MongoDB

Libraries:

shortid or nanoid → generate short codes

user-agent-parser → detect browser/device

geoip-lite (optional) → get location from IP

📝 Data Models

URL Model

{
  originalUrl: String,
  shortCode: String,
  shortUrl: String,
  createdAt: Date,
  clicks: Number
}


Click Model

{
  shortCode: String,
  timestamp: Date,
  ip: String,
  browser: String,
  device: String
}

🌍 User Flow

User opens website → pastes long link → clicks “Shorten”.

Gets back a short link like https://short.ly/abc123.

Shares the short link anywhere (WhatsApp, Social Media).

When people click it, system redirects + stores info.

User opens dashboard to see charts of how many people clicked.

🧪 Bonus Ideas (Optional)

Generate a QR Code for each short URL.

Add expiry dates or click limits.

Custom short URLs (e.g., /my-sale instead of random code).

Add a simple admin panel to manage all links.

🎯 Why this is a strong project

✅ Real-world use (like Bitly)
✅ Shows backend + frontend skills
✅ Uses database + analytics
✅ Easy to explain in interviews
✅ You can deploy it on Render, Vercel, or Railway for free

Do you want me to give you the step-by-step code structure for this mini project (backend first)? 🧱💻