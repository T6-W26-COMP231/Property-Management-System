const express  = require("express");
const http     = require("http");
const cors     = require("cors");
// clean config files
const { PORT, CLIENT_URL } = require("./config/config");
const connectDB = require("./config/db");

const userRoutes = require("./routes/users");

const app    = express();
const server = http.createServer(app);

// Connect to the db
connectDB();

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

app.use("/api/users", userRoutes);

// ─── Start Server ─────────────────────────────────────────────────────────────
server.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});