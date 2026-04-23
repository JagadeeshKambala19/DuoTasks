# Use official Node image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining source code
COPY . .

# Expose React dev server port
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]