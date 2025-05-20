# **Color Detect**
## **Description:**
The Color Detect App detects dominant colors in an image using the Clarifai API, displaying results as color swatches with names. Built with React, Node.js, and PostgreSQL, it provides a clean and interactive user experience.

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

3. **Configure Environment Variables:**
    ```
    In the `server` folder, create a `.env` file and add:
    ```
    DB_HOST=127.0.0.1
    DB_USER=your_postgres_user
    DB_PASS=your_postgres_password
    DB_NAME=colordetect
    CLARIFAI_API_KEY=your_clarifai_api_key
    ```

    In the `client` folder, create a `.env` file and add:
    ```
    REACT_APP_API_BASE_URL=http://localhost:3001

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
