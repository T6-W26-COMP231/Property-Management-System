import { io } from "socket.io-client";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

let socket = null;

export const connectSocket = (token) => {
  if (socket?.connected) return socket;

  socket = io(SERVER_URL, {
    auth:       { token },
    autoConnect: false, // manually connect after setting auth
    withCredentials: true,
    reconnection:         true,
    reconnectionAttempts: 5,
    reconnectionDelay:    1000,
  });

  return socket;
};

export const getSocket        = () => socket;
export const disconnectSocket = () => { socket?.disconnect(); socket = null; };
