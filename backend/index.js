const express = require('express');
const cors = require('cors');
const db = require('./db'); 
require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

// Routes
const jobRoutes = require('./routes/jobs');
app.use('/api/jobs', jobRoutes);

app.get('/', (req, res) => {
  res.send('Job Tracker API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
