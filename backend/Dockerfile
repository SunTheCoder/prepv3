# Use Node.js base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Compile TypeScript (Ensures database.ts → database.js)
RUN npx tsc

# Debug: Ensure compiled files exist
RUN ls -la dist/config/

# Expose backend port
EXPOSE 3000

# Start the backend without running migrations
CMD ["npm", "run", "dev"]

