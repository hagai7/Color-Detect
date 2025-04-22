Smart Brain
Face detection app built with React (frontend) and Node.js + Express + PostgreSQL (backend).

Project Structure:
smart-brain/
├── smart-brain-master/        # Frontend (React)
├── smart-brain-api-master/    # Backend (Node.js + Express)
├── create_tables.sql          # SQL to create necessary DB tables

Prerequisites:
Node.js & npm
PostgreSQL
Clarifai API key

Setup Instructions:
1. Clone & Install Dependencies:

git clone https://github.com/yourusername/smart-brain.git
cd smart-brain

# Install frontend
cd smart-brain-master
npm install

# Install backend
cd ../smart-brain-api-master
npm install

2. Set Up PostgreSQL:
Create a database (e.g. smartbrain)

Run the provided SQL script to create the required tables:
psql -U postgres -d smartbrain -f ../create_tables.sql

3. Configure Backend
Edit smart-brain-api-master/server.js:

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'your_postgres_user',
    password: 'your_postgres_password',
    database: 'smartbrain'
  }
});

4. Add your Clarifai API key in controllers/image.js.

Running the App:
Start the backend:
cd smart-brain-api-master
npm start

Start the frontend:
cd ../smart-brain-master
npm start

Then go to: http://localhost:3001

Features:
Register / Sign In

Face detection using Clarifai API

User ranking based on number of submissions
