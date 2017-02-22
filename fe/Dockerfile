# Use stable base node image 
FROM node:argon

# Create app directory
RUN mkdir -p /usr/jukebox
WORKDIR /usr/jukebox

# Install app dependencies
COPY package.json /usr/jukebox
RUN npm install

# Set environment variables
ENV PORT 8080

# Bundle app source
COPY . /usr/jukebox

# Expose port for HTTP traffic
EXPOSE ${PORT}

# Start the server
CMD [ "npm", "start" ]
