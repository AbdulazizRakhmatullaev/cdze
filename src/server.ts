import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 5001;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Catch-all handler for any other routes, serves React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

