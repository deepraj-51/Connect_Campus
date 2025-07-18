# ========== Frontend Build Stage ==========
FROM node:18 as frontend
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build

# ========== Backend Setup Stage ==========
FROM node:18 as backend
WORKDIR /app/server

# Copy .env first
COPY server/.env .env

# Copy backend files
COPY server/package*.json ./
RUN npm install
COPY server/ .

# Make sure the public folder exists and copy the built frontend into it
RUN mkdir -p public
COPY --from=frontend /app/client/dist ./public

# Start the server
EXPOSE 5000
CMD ["node", "index.js"]
