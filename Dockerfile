# Use the official Node.js  LTS image as base
FROM node:latest

# Create and set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install NestJS dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Expose the port your app runs on
EXPOSE 3001

# Set the default command to run your app using NestJS CLI
CMD ["npm", "run", "start:dev"]