import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';

const app = express();
app.use(cors());

const port = 3000;

// Mock data for socks
const mockSocks = [
  { name: 'Rainbow Sock', color: 'Rainbow', size: 'M', price: 12.99 },
  { name: 'Blue Stripe Sock', color: 'Blue', size: 'L', price: 9.99 },
  { name: 'Green Polka Sock', color: 'Green', size: 'S', price: 10.99 }
];

// Endpoint to get socks data
app.get('/api/socks', (req, res) => {
  res.json(mockSocks);
});

// Start the Express server
app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`);
});

// WebSocket Server
const wsPort = 8080;

const wss = new WebSocketServer({ port: wsPort });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    const messageString = message.toString();

    try {
      // Try to parse the message as JSON
      const parsedMessage = JSON.parse(messageString);
      console.log('Received JSON message:', parsedMessage);

      // Prepare a response as a JSON object
      const response = {
        status: 'success',
        receivedMessage: parsedMessage,
        message: 'Your message was received!',
      };

      // Broadcast to all connected clients
      broadcastMessage(response);

    } catch (error) {
      // Handle invalid JSON
      console.error('Invalid JSON received:', messageString);

      // Send an error response to the sender
      const errorResponse = {
        status: 'error',
        message: 'Invalid JSON format',
      };
      ws.send(JSON.stringify(errorResponse));
    }
  });

  // Function to broadcast a message to all connected clients
  function broadcastMessage(data) {
    const jsonData = JSON.stringify(data);
    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(jsonData);
      }
    });
  }

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log(`WebSocket server is running on ws://localhost:${wsPort}`);