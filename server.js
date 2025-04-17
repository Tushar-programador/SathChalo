
import connectDB from './config/db.js';
import { Server } from 'socket.io';
import { app } from './app.js'


let server;

connectDB()
  .then(() => {
    console.log("Database connected");

    server = app.on("error", (e) => {
      console.log("Error in database connection -- ", e);
      throw e;
    });

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error in database connection ", err);
  });


const io = new Server(server);
io.on('connection', (socket) => {
  console.log('New WebSocket connection');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
