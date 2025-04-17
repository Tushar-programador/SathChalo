import express, { json } from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/userRoute.js';
import { Server } from 'socket.io';

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);

// Create server and Socket.IO
const server = app.listen(5000, () => {
  console.log('Server started on port 5000');
});

const io = new Server(server);
io.on('connection', (socket) => {
  console.log('New WebSocket connection');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
