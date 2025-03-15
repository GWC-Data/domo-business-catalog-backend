# Use the official lightweight Node.js image.
FROM node:18-slim
 
# Install Yarn globally.
RUN corepack enable

# Create and change to the app directory.
WORKDIR /usr/src/app/backend
 
# Copying this first prevents re-running yarn install on every code change.
COPY package.json yarn.lock ./
 
 
# RUN npm ci --only=production
RUN npm install --only=production
 
# Set the environmental variable for JWT token
ENV PORT=6001
ENV NODE_ENV="production"
ENV MONGO_URI="mongodb+srv://vishwanath:vishwanath@domo.wyhkn.mongodb.net/domo_business_catalog?retryWrites=true&w=majority&appName=domo"


# Copy local code to the container image.
COPY . ./
 
# Run the web service on container startup.
CMD [ "yarn", "start" ]