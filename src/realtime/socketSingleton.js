import { io } from "socket.io-client";

// FIXED: Remove '/api' from the socket URL - Socket.IO runs on the main server port
const SOCKET_URL = 'http://localhost:5000'; // Changed from 'http://localhost:5000/api'

console.log('🔍 Attempting to connect to:', SOCKET_URL);

const socket = io(SOCKET_URL, {
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: 10, // Increased attempts
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  transports: ["polling", "websocket"], // Try polling first
  forceNew: false, // Changed to false to allow connection reuse
  autoConnect: true
});

// Comprehensive logging for debugging
socket.on('connect', () => {
  console.log('✅ Successfully connected to server!');
  console.log('📡 Socket ID:', socket.id);
  console.log('🚀 Transport:', socket.io.engine.transport.name);
});

socket.on('connect_error', (error) => {
  console.error('❌ Connection failed:', error.message);
  console.error('🔍 Full error:', error);
  console.error('🔍 Error type:', error.type);
  console.error('🔍 Error description:', error.description);
});

socket.on('disconnect', (reason) => {
  console.log('📡 Disconnected:', reason);
  if (reason === 'io server disconnect') {
    // The disconnection was initiated by the server, reconnect manually
    socket.connect();
  }
});

socket.on('reconnect', (attemptNumber) => {
  console.log('🔄 Reconnected after', attemptNumber, 'attempts');
});

socket.on('reconnect_attempt', (attemptNumber) => {
  console.log('🔄 Reconnection attempt #', attemptNumber);
});

socket.on('reconnect_error', (error) => {
  console.error('❌ Reconnection failed:', error);
});

socket.on('reconnect_failed', () => {
  console.error('❌ All reconnection attempts failed');
});

socket.on('welcome', (data) => {
  console.log('🎉 Welcome from server:', data);
});

socket.on('room:joined', (data) => {
  console.log('🏠 Joined room:', data);
});

// Transport upgrade logging
socket.io.on('upgrade', () => {
  console.log('⬆️ Transport upgraded to:', socket.io.engine.transport.name);
});

export default socket;