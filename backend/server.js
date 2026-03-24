const express  = require("express");
const http     = require("http");
const cors     = require("cors");
const cloudinary = require('cloudinary').v2;

// clean config files
const { PORT, CLIENT_URL } = require("./config/config");
const connectDB = require("./config/db");

const userRoutes    = require("./routes/users");
const propertyRoutes   = require("./routes/properties");
const app    = express();
const server = http.createServer(app);

// ─── Cloudinary ───────────────────────────────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Connect to the db
connectDB();

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());


app.use("/api/users",    userRoutes);
app.use("/api/properties", propertyRoutes);

// ─── Start Server ─────────────────────────────────────────────────────────────
server.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});