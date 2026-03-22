require("dotenv").config();
const express  = require("express");
const http     = require("http");
const mongoose = require("mongoose");
const cors     = require("cors");

const userRoutes    = require("./routes/users");

const app    = express();
const server = http.createServer(app);


app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());


app.use("/api/users",    userRoutes);


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
