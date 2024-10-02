# Use the official Node.js image based on Alpine
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Use a new stage to create a production image
FROM node:20-alpine

# Set the working directory for the production image
WORKDIR /app

# Copy built files and necessary directories from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/Reinforcements ./Reinforcements
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Command to run the application
CMD ["node", "--max-old-space-size=512", "dist/bundle.main.js"]
