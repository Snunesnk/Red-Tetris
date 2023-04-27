FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed dependencies specified in package.json
RUN npm ci

# Make port 3042 available to the world outside this container
EXPOSE 3042

# Define environment variable
ENV NODE_ENV=production

RUN npm run cli-prod

# Run the app when the container launches
CMD ["npm", "run", "srv-prod"]