import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import sql from 'mssql';
import jwt from 'jsonwebtoken';

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret'; // Use a secure, long, and random key in production

// SQL Server Configuration
const dbConfig = {
  user: 'sa',  // This is not a good practice. For demo purposes only.
  password: 'password',  // 🤢 This is not a good practice. For demo purposes only.
  server: 'localhost', // e.g., 'localhost'
  database: 'Northwind',
  options: {
    encrypt: true,       // Use encryption
    trustServerCertificate: true // Only for development, not recommended for production
  }
}

const app = express();
app.use(cors());
app.use(express.json());

// JWT Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Ensure the authorization header exists and has "Bearer" prefix
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send('Access Denied');
  }

  // Extract the token by removing "Bearer " prefix
  const token = authHeader.split(' ')[1];

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);  // Log the error for debugging
      return res.status(403).send('Invalid Token');
    }
    
    req.user = user; // Store user data in request
    next(); // Continue to the next middleware or route handler
  });
};

const port = 3000;

// Endpoint for login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // This is a demo; you should fetch users from the database
  if (username === 'admin' && password === 'password') {
    // Generate JWT token
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).send('Invalid credentials');
});

// Protected route example
app.get('/api/protected/products', authenticateToken, async (req, res) => {
  console.log(authenticateToken);
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query('select name, color, size, price from socks;');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send('Error fetching products: ' + err.message);
  } finally {
    sql.close();
  }
});

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

// Route to get all products
app.get('/api/products', async (req, res) => {
  try {
    // Connect to SQL Server
    const pool = await sql.connect(dbConfig);

    // Query to select all rows from the 'products' table
    const result = await pool.request().query('select name, color, size, price from socks;');

    // Send the result as a response
    res.json(result.recordset);
  } catch (err) {
    // Handle any errors
    res.status(500).send('Error fetching products: ' + err.message);
  } finally {
    // Close the SQL connection
    sql.close();
  }
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