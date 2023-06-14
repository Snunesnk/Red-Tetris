# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

ENV NODE_ENV=production

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies
RUN npm ci

RUN echo "Front is not compiled, pleasen compile it beforehand using 'npm run cli-prod'"

# Copy the entire application to the container
COPY . .

# Expose the port on which your Node.js app is listening
EXPOSE 3042

# Set the command to run your Node.js app
CMD ["npm", "run", "srv-prod"]