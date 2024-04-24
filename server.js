const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const app = express();
const PORT = process.env.PORT || 5000;
const controller = require('./controllers/controller');

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.post('/signup', controller.signup);

app.post('/login', controller.login);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
