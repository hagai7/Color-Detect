# Step 1: Build React app
FROM node:18 AS client-builder

WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build

# Step 2: Set up backend
FROM node:18

WORKDIR /app

# Copy backend files
COPY server/package*.json ./server/
RUN cd server && npm install

# Copy backend source
COPY server/ ./server

# Copy built React files into backend
COPY --from=client-builder /app/client/build ./server/build

# Serve frontend with Express (assuming backend serves from ./build)
WORKDIR /app/server
EXPOSE 3000
CMD ["npm", "start"]
