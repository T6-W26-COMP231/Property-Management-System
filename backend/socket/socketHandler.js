const { Server }            = require("socket.io");
const { verifySocketToken } = require("../middleware/auth");

// Track online users: { auth0Id: socketId }
const onlineUsers = {};
let   ioInstance  = null;

const getIO          = () => ioInstance;
const getOnlineUsers = () => onlineUsers;

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin:  process.env.CLIENT_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ['polling', 'websocket'] // fallback to polling if websocket fails
  });

  ioInstance = io;

  // Verify Auth0 JWT on every handshake
  io.use(async (socket, next) => {
    try {
      const token   = socket.handshake.auth.token;
      if (!token) return next(new Error("No token"));
      const payload = await verifySocketToken(token);
      socket.userId = payload.sub;
      next();
    } catch (err) {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.userId;
    onlineUsers[userId] = socket.id;
    console.log(`🔌 ${userId} connected`);

    socket.on("disconnect", () => {
      delete onlineUsers[userId];
      console.log(`❌ ${userId} disconnected`);
    });
  });

  return io;
};

module.exports = { initSocket, getIO, getOnlineUsers };
