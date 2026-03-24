const express  = require("express");
const http     = require("http");
const cors     = require("cors");
const cloudinary = require('cloudinary').v2;

// clean config files
const { PORT, CLIENT_URL, FRONTEND_URL } = require("./config/config");
const connectDB = require("./config/db");

const userRoutes    = require("./routes/users");
const propertyRoutes   = require("./routes/properties");
const indexRouter      = require("./routes/index");
const app    = express();
const server = http.createServer(app);

// Connect to the db
connectDB();

// ─── Cloudinary ───────────────────────────────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const allowedOrigins = [CLIENT_URL,FRONTEND_URL];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json({limit: '10mb'}));

app.use("/", indexRouter);
app.use("/api/users",    userRoutes);
app.use("/api/properties", propertyRoutes);

// ─── Start Server ─────────────────────────────────────────────────────────────
server.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});