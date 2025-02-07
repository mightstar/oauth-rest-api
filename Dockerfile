# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript project
RUN npm run build

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["npm", "start"]