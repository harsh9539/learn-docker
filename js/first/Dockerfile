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

# Remove unnecessary files to reduce image size
RUN wget -qO- https://gobinaries.com/tj/node-prune | /bin/sh && node-prune

# Copy the rest of the source code
COPY . .

# -------- STAGE 2: Final Slim Image --------

# Use a smaller base image for the final stage (slim is generally 70 to 80mb)
# FROM node:18-slim 

# Use Alpine for a smaller footprint (alpine is almot 30 to 40mb)
FROM node:18-alpine 
# Set working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app /app

# Expose port
EXPOSE 8080

# Command to run the app
CMD ["node", "index.js"]
