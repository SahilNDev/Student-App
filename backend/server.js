const express = require('express');
const mongoose = require('mongoose');
const loginRoutes = require('./routes/login');
const signupRoutes = require('./routes/signup');
const studentRoutes = require('./routes/students');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection URL
const MONGODB_URI = 'mongodb+srv://sahiln:1234567890@cluster0.qleed9o.mongodb.net/full-stack';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});const db = mongoose.connection;

// Check MongoDB connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);
app.use('/students', studentRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
