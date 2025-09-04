# Use a full Node.js image
FROM node:lts-alpine3.22

# Set working directory
WORKDIR /app

# Copy package manifests
COPY package.json package-lock.json ./

# Install all dependencies
RUN npm install

# Copy the rest of your application
COPY . .

# Expose default React port
EXPOSE 3000

# Start the React development server
CMD ["npm", "start", "--", "--host", "0.0.0.0"]