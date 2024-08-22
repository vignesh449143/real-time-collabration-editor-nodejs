const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const db = require('./models');
require('dotenv').config();
// const userRoutes = require('./routes/userRoutes'); // Ensure correct path

const app = express();
const server = http.createServer(app);

// Use body-parser to parse JSON requests
app.use(bodyParser.json());

// // Serve static files (e.g., for frontend)
// app.use(express.static('views'));

// Import and use the main router
const mainRouter = require('./routes/index');
app.use('/v1/api', mainRouter);


// WebSocket server
const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);

    // Broadcast message to all connected clients
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });
  
  ws.on('close', () => {
    console.log('A client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});




