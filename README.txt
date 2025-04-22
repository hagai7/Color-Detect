Color Detect
Color detection app built with React (frontend) and Node.js + Express + PostgreSQL (backend).

Project Structure:
color-detect/
├── client/    			            # Frontend (React)
├── server/    			            # Backend (Node.js + Express)
├── create_tables.sql         	# SQL to create necessary DB tables

Prerequisites:
Node.js & npm
PostgreSQL
Clarifai API key

Setup Instructions:
1. Clone & Install Dependencies:

git clone https://github.com/hagai7/color-detect.git
cd color-detect

# Install frontend
cd client
npm install

# Install backend
cd ../server
npm install

2. Set Up PostgreSQL:
Create a database (e.g. colordetect)

Run the provided SQL script to create the required tables:
psql -U postgres -d colordetect -f ../create_tables.sql

3. Configure Backend
Edit server/server.js:

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'your_postgres_user',
    password: 'your_postgres_password',
    database: 'colordetect'
  }
});

4. Add your Clarifai API key in controllers/image.js.

Running the App:
Start the backend:
cd server
npm start

Start the frontend:
cd ../client
npm start

Then go to: http://localhost:3001

Features:
Register / Sign In

Color detection using Clarifai API

User submission count based on number of submissions
