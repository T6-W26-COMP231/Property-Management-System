import http from "./http";

// GET /api/messages/:roomId — load messages for a room
// Optional query params: limit, before (for pagination)
export const getMessages = (token, roomId, { limit = 50, before } = {}) => {
  const params = new URLSearchParams({ limit });
  if (before) params.append("before", before);
  return http(`/api/messages/${roomId}?${params}`, token);
};
