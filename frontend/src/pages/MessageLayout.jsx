import { useState } from "react";
 
// ── Fake data — pretend fetched from API ──────────────────────────────────────
const FAKE_CONTACTS = [
  {
    id: 1,
    name:        "Alice Johnson",
    role:        "resident",
    auth0Id:     "fake-001",
    picture:     "https://placehold.co/40x40/FF6B6B/ffffff?text=AJ",
    isOnline:    true,
    lastMessage: { text: "Hi, is the plumber coming today?", sentAt: "2026-03-18T09:30:00Z", senderName: "Alice Johnson" },
    unread:      2,
  },
  {
    id: 2,
    name:        "Bob Martinez",
    role:        "resident",
    auth0Id:     "fake-002",
    picture:     "https://placehold.co/40x40/FF9F43/ffffff?text=BM",
    isOnline:    false,
    lastMessage: { text: "Thank you for fixing the heater!", sentAt: "2026-03-17T15:00:00Z", senderName: "Bob Martinez" },
    unread:      0,
  },
  {
    id: 3,
    name:        "Carol White",
    role:        "resident",
    auth0Id:     "fake-003",
    picture:     "https://placehold.co/40x40/FECA57/333333?text=CW",
    isOnline:    true,
    lastMessage: { text: "You: Will check it tomorrow.", sentAt: "2026-03-17T11:20:00Z", senderName: "You" },
    unread:      0,
  },
  {
    id: 4,
    name:        "David Kim",
    role:        "contractor",
    auth0Id:     "fake-004",
    picture:     "https://placehold.co/40x40/48DBFB/333333?text=DK",
    isOnline:    true,
    lastMessage: { text: "I can be there by 2pm.", sentAt: "2026-03-18T08:00:00Z", senderName: "David Kim" },
    unread:      1,
  },
  {
    id: 5,
    name:        "Emma Davis",
    role:        "resident",
    auth0Id:     "fake-005",
    picture:     "https://placehold.co/40x40/FF9FF3/333333?text=ED",
    isOnline:    false,
    lastMessage: null,
    unread:      0,
  },
  {
    id: 6,
    name:        "Frank Lee",
    role:        "contractor",
    auth0Id:     "fake-006",
    picture:     "https://placehold.co/40x40/54A0FF/ffffff?text=FL",
    isOnline:    false,
    lastMessage: { text: "Job done. Invoice sent.", sentAt: "2026-03-16T17:00:00Z", senderName: "Frank Lee" },
    unread:      0,
  },
];
 
const FAKE_MESSAGES = {
  "fake-001": [
    { id: 1, senderId: "fake-001", senderName: "Alice Johnson", message: "Hi, the bathroom faucet is leaking again.",         createdAt: "2026-03-18T09:00:00Z", read: true  },
    { id: 2, senderId: "me",       senderName: "You",           message: "Thanks for letting me know, I'll send someone.",   createdAt: "2026-03-18T09:10:00Z", read: true  },
    { id: 3, senderId: "fake-001", senderName: "Alice Johnson", message: "Hi, is the plumber coming today?",                 createdAt: "2026-03-18T09:30:00Z", read: false },
  ],
  "fake-002": [
    { id: 1, senderId: "me",       senderName: "You",           message: "The heater repair is complete!",                   createdAt: "2026-03-17T14:50:00Z", read: true  },
    { id: 2, senderId: "fake-002", senderName: "Bob Martinez",  message: "Thank you for fixing the heater!",                 createdAt: "2026-03-17T15:00:00Z", read: true  },
  ],
  "fake-003": [
    { id: 1, senderId: "fake-003", senderName: "Carol White",   message: "The window lock is still broken.",                 createdAt: "2026-03-17T11:00:00Z", read: true  },
    { id: 2, senderId: "me",       senderName: "You",           message: "Will check it tomorrow.",                         createdAt: "2026-03-17T11:20:00Z", read: true  },
  ],
  "fake-004": [
    { id: 1, senderId: "me",       senderName: "You",           message: "Can you come fix the elevator tomorrow?",          createdAt: "2026-03-18T07:30:00Z", read: true  },
    { id: 2, senderId: "fake-004", senderName: "David Kim",     message: "I can be there by 2pm.",                          createdAt: "2026-03-18T08:00:00Z", read: false },
  ],
  "fake-005": [],
  "fake-006": [
    { id: 1, senderId: "fake-006", senderName: "Frank Lee",     message: "Job done. Invoice sent.",                         createdAt: "2026-03-16T17:00:00Z", read: true  },
  ],
};
 
// ── Helpers ───────────────────────────────────────────────────────────────────
const ROLE_BADGE = {
  resident:   "success",
  landlord:   "primary",
  contractor: "warning",
};
 
function formatTime(iso) {
  if (!iso) return "";
  const d = new Date(iso), now = new Date();
  if (d.toDateString() === now.toDateString())
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
}
 
// ── Component ─────────────────────────────────────────────────────────────────
export default function MessagesLayoutPage() {
  const [activeContact, setActiveContact] = useState(null);
  const [inputText,     setInputText]     = useState("");
  const [search,        setSearch]        = useState("");
  const [messages,      setMessages]      = useState([]);
 
  const openChat = (contact) => {
    setActiveContact(contact);
    setMessages(FAKE_MESSAGES[contact.auth0Id] || []);
    setInputText("");
  };
 
  // Fake send — just adds to local messages array
  const sendMessage = () => {
    if (!inputText.trim() || !activeContact) return;
    const newMsg = {
      id:         messages.length + 1,
      senderId:   "me",
      senderName: "You",
      message:    inputText.trim(),
      createdAt:  new Date().toISOString(),
      read:       true,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
  };
 
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };
 
  const filtered = FAKE_CONTACTS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.role.toLowerCase().includes(search.toLowerCase())
  );
 
  return (
    <div className="d-flex border-top" style={{ height: "calc(100vh - 56px)" }}>
 
      {/* ── LEFT PANEL ── */}
      <div className="d-flex flex-column border-end bg-white" style={{ width: 280, minWidth: 280 }}>
 
        {/* Header */}
        <div className="p-3 border-bottom">
          <h6 className="fw-bold mb-2">Messages</h6>
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search text-muted" />
            </span>
            <input
              className="form-control border-start-0 ps-0"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
 
        {/* Contact list */}
        <div className="overflow-y-auto flex-grow-1">
          {filtered.length === 0 ? (
            <div className="d-flex flex-column align-items-center justify-content-center h-100 text-muted">
              <i className="bi bi-people fs-3 mb-2" />
              <small>No contacts found</small>
            </div>
          ) : (
            filtered.map((c) => {
              const isActive = activeContact?.auth0Id === c.auth0Id;
              return (
                <div
                  key={c.id}
                  className={`d-flex align-items-center gap-2 px-3 py-2 border-bottom ${isActive ? "bg-primary bg-opacity-10 border-start border-3 border-primary" : "bg-white"}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => openChat(c)}
                >
                  {/* Avatar + online dot */}
                  <div className="position-relative flex-shrink-0">
                    <img
                      src={c.picture}
                      alt={c.name}
                      className="rounded-circle"
                      width={42}
                      height={42}
                    />
                    <span
                      className={`position-absolute bottom-0 end-0 rounded-circle border border-white ${c.isOnline ? "bg-success" : "bg-secondary"}`}
                      style={{ width: 10, height: 10 }}
                    />
                  </div>
 
                  {/* Info */}
                  <div className="flex-grow-1 overflow-hidden">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-semibold text-truncate" style={{ fontSize: 13 }}>{c.name}</span>
                      {c.lastMessage?.sentAt && (
                        <span className="text-muted flex-shrink-0 ms-1" style={{ fontSize: 10 }}>
                          {formatTime(c.lastMessage.sentAt)}
                        </span>
                      )}
                    </div>
                    <div className="d-flex align-items-center gap-1 mt-1">
                      <span className={`badge bg-${ROLE_BADGE[c.role]}`} style={{ fontSize: 9 }}>{c.role}</span>
                      <span className="text-muted text-truncate" style={{ fontSize: 11 }}>
                        {c.lastMessage?.text || "No messages yet"}
                      </span>
                    </div>
                  </div>
 
                  {/* Unread */}
                  {c.unread > 0 && (
                    <span className="badge bg-primary rounded-pill flex-shrink-0">{c.unread}</span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
 
      {/* ── RIGHT PANEL ── */}
      <div className="d-flex flex-column flex-grow-1 overflow-hidden">
        {!activeContact ? (
          <div className="d-flex flex-column align-items-center justify-content-center h-100 text-muted bg-light">
            <i className="bi bi-chat-dots text-primary fs-1 mb-3 opacity-50" />
            <h6 className="fw-semibold">Select a conversation</h6>
            <small>Choose someone from the left to start chatting</small>
          </div>
        ) : (
          <>
            {/* Chat header */}
            <div className="d-flex align-items-center gap-3 px-3 py-2 bg-white border-bottom shadow-sm flex-shrink-0">
              <img
                src={activeContact.picture}
                alt={activeContact.name}
                className="rounded-circle"
                width={38}
                height={38}
              />
              <div className="flex-grow-1">
                <div className="fw-semibold" style={{ fontSize: 14 }}>{activeContact.name}</div>
                <span className={`badge bg-${ROLE_BADGE[activeContact.role]}`} style={{ fontSize: 10 }}>
                  {activeContact.role}
                </span>
              </div>
              <span className={`badge ${activeContact.isOnline ? "bg-success" : "bg-secondary"}`}>
                {activeContact.isOnline ? "Online" : "Offline"}
              </span>
            </div>
 
            {/* Messages */}
            <div className="flex-grow-1 overflow-y-auto p-3 bg-light d-flex flex-column gap-2">
              {messages.length === 0 ? (
                <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1 text-muted">
                  <i className="bi bi-chat-dots fs-1 mb-2" />
                  <small>No messages yet — say hello!</small>
                </div>
              ) : (
                messages.map((msg) => {
                  const isMe = msg.senderId === "me";
                  return (
                    <div key={msg.id} className={`d-flex align-items-end gap-2 ${isMe ? "flex-row-reverse" : ""}`}>
                      {/* Avatar */}
                      {!isMe && (
                        <img
                          src={activeContact.picture}
                          alt={msg.senderName}
                          className="rounded-circle flex-shrink-0"
                          width={28}
                          height={28}
                        />
                      )}
 
                      {/* Bubble */}
                      <div className={`d-flex flex-column ${isMe ? "align-items-end" : "align-items-start"}`}>
                        <div
                          className={`px-3 py-2 rounded-3 ${isMe ? "bg-primary text-white" : "bg-white border text-dark"}`}
                          style={{ maxWidth: 260, fontSize: 13, wordBreak: "break-word" }}
                        >
                          {msg.message}
                        </div>
                        <small className="text-muted mt-1" style={{ fontSize: 10 }}>
                          {formatTime(msg.createdAt)}
                          {isMe && <span className="ms-1">{msg.read ? "✓✓" : "✓"}</span>}
                        </small>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
 
            {/* Input */}
            <div className="bg-white border-top p-3 flex-shrink-0">
              <div className="input-group">
                <textarea
                  className="form-control form-control-sm"
                  placeholder={`Message ${activeContact.name}...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  maxLength={2000}
                  style={{ resize: "none" }}
                />
                <button
                  className="btn btn-primary"
                  onClick={sendMessage}
                  disabled={!inputText.trim()}
                >
                  <i className="bi bi-send-fill" />
                </button>
              </div>
              <small className="text-muted">Enter to send · Shift+Enter for new line</small>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
 