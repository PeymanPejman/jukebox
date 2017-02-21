FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Set environment variables
ENV PORT 8080

# Bundle app source
COPY . /usr/src/app

EXPOSE ${PORT}
CMD [ "npm", "start" ]
