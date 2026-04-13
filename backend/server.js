require("dotenv").config();
const express  = require("express");
const http     = require("http");
const mongoose = require("mongoose");
const cors     = require("cors");
const cloudinary = require("cloudinary").v2;

const userRoutes        = require("./routes/users");
const propertyRoutes    = require("./routes/properties");
const profileRoutes     = require("./routes/profile");
const assignmentRoutes  = require("./routes/assignments");
const maintenanceRoutes = require("./routes/maintenance");
const notificationRoutes = require("./routes/notifications");
const ratingRoutes = require("./routes/ratings");
const { initSocket } = require("./socket/socketHandler");

const app    = express();
const server = http.createServer(app);

// ─── Cloudinary ───────────────────────────────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json({ limit: "10mb" })); // increased for base64 images



// ─── Routes ─────────────────────────────────────────────────────────────────

app.use("/api/users",    userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/profile",      profileRoutes);
app.use("/api/assignments",   assignmentRoutes);
app.use("/api/maintenance",  maintenanceRoutes);
app.use("/api/notifications",  notificationRoutes);
app.use("/api/ratings",  ratingRoutes);
// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;

// Attaching socket.io to the server
initSocket(server);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    server.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  });
