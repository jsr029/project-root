# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the frontend application
RUN npm run build

# Install serve to serve the build folder
RUN npm install -g serve

# Expose the port on which your app runs
EXPOSE 3000

# Define the command to run your application
CMD ["serve", "-s", "build"]
