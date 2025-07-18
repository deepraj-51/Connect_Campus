const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const path = require('path');

const app = express();

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// 🛠 Fix: Use a valid wildcard route pattern for Express 5
app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
