require("dotenv").config();
const express  = require("express");
const http     = require("http");
const mongoose = require("mongoose");
const cors     = require("cors");
const cloudinary = require('cloudinary').v2;


const userRoutes    = require("./routes/users");
const propertyRoutes   = require("./routes/properties");
const app    = express();
const server = http.createServer(app);
const profileRoutes     = require("./routes/profile");
// ─── Cloudinary ───────────────────────────────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json({limit: "10mb"}));


app.use("/api/users",    userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/profile",      profileRoutes);
// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" MongoDB connected");
    server.listen(PORT, () => console.log(`✅ Server on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error(" MongoDB error:", err.message);
    process.exit(1);
  });
