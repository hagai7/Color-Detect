require('dotenv').config();


const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const PORT = process.env.PORT || 3000;


// Importing the controllers
const signupController = require('./controllers/signup');
const loginController = require('./controllers/login');
const profileController = require('./controllers/profile');
const imageController = require('./controllers/image');

// Initialize knex and database connection
const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
});

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Express includes built-in body parser from version 4.16+

app.post('/login', loginController.handleLogin(db, bcrypt));
app.post('/signup', signupController.handleSignUp(db, bcrypt));
app.get('/profile/:id',  profileController.handleProfileGet(db));
app.put('/entries', imageController.handleEntriesCount(db));
app.post('/imageurl', imageController.handleApiCall);


const path = require('path');

// Routes
app.get('/', (_req, res) => {
  res.send('API is working');
});


// Start server

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
