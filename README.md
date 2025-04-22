# **Color Detect**
Color detection app built with React (frontend) and Node.js + Express + PostgreSQL (backend).

## **Prerequisites:**
- Node.js & npm
- PostgreSQL
- Clarifai API key

## **Setup Instructions:**
1. **Clone & Install Dependencies:**
    ```bash
    git clone https://github.com/hagai7/color-detect.git
    cd color-detect
    ```

    ### **Install frontend**
    ```bash
    cd client
    npm install
    ```

    ### **Install backend**
    ```bash
    cd ../server
    npm install
    ```

2. **Set Up PostgreSQL:**
    Create a database (e.g. colordetect)

    Run the provided SQL script to create the required tables:
    ```bash
    psql -U postgres -d colordetect -f ../create_tables.sql
    ```

3. **Configure Backend:**
    Edit `server/server.js`:
    ```javascript
    const db = knex({
      client: 'pg',
      connection: {
        host: '127.0.0.1',
        user: 'your_postgres_user',
        password: 'your_postgres_password',
        database: 'colordetect'
      }
    });
    ```

4. **Add your Clarifai API key in controllers/image.js.**

## **Running the App:**
Start the backend:
```bash
cd server
npm start
```

Start the frontend:
```bash
cd ../client
npm start
```
Then go to: http://localhost:3001
