import express from 'express';
import cors from 'cors';

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

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});