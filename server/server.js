const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

// Importing the controllers
const signupController = require('./controllers/signup');
const loginController = require('./controllers/login');
const profileController = require('./controllers/profile');
const imageController = require('./controllers/image');

// Initialize knex and database connection
const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'hagai007',
    database: 'test',
  },
});

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Express includes built-in body parser from version 4.16+

// Routes
app.get('/', (req, res) => {
  res.send('API is working');
});

app.post('/login', loginController.handleLogin(db, bcrypt));
app.post('/signup', signupController.handleSignUp(db, bcrypt));
app.get('/profile/:id',  profileController.handleProfileGet(db));
app.put('/entries', imageController.handleEntriesCount(db));
app.post('/imageurl', imageController.handleApiCall);

// Start server
app.listen(3000, () => {
  console.log('App is running on port 3000');
});
