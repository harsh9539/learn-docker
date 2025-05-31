# FROM node:18

# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 8080
# CMD ["node", "index.js"]
# -------- STAGE 1: Build Dependencies --------
FROM node:18 AS builder

# Install curl for healthchecks
# RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy only package files first to leverage Docker layer caching
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy the rest of the source code
COPY . .

# -------- STAGE 2: Final Slim Image --------
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app /app

# Expose port
EXPOSE 8080

# Command to run the app
CMD ["node", "index.js"]
