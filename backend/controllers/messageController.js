const Message = require("../models/Message");
const Room    = require("../models/Room");

// GET /api/messages/:roomId
const getMessages = async (req, res) => {
  try {
    const myId   = req.auth.payload.sub;
    const { roomId } = req.params;
    const limit  = parseInt(req.query.limit) || 50;
    const before = req.query.before; // optional cursor for pagination

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ error: "Room not found" });

    if (!room.participants.includes(myId)) {
      return res.status(403).json({ error: "Access denied" });
    }

    const query = { roomId: room._id };
    if (before) query.createdAt = { $lt: new Date(before) };

    const messages = await Message
      .find(query)
      .sort({ createdAt: 1 })
      .limit(limit);

    // Mark all unread messages from the other user as read
    await Message.updateMany(
      { roomId: room._id, senderId: { $ne: myId }, read: false },
      { $set: { read: true } }
    );

    // Reset this user's unread count in the room
    await Room.findByIdAndUpdate(roomId, {
      $set: { [`unreadCount.${myId}`]: 0 },
    });

    res.json(messages);
  } catch (err) {
    console.error("getMessages error:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

module.exports = { getMessages };
