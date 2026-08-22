const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Default root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to AlgoInsight API' });
});

// Routes
const healthRouter = require('./routes/health');
const algorithmsRouter = require('./routes/algorithms');

app.use('/api', healthRouter);
app.use('/api/algorithms', algorithmsRouter);

// Port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
