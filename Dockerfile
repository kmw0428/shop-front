# Stage 1: Build the React application using Vite
FROM node:20.11.0 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the build output with a static server
FROM nginx:alpine

# Copy the build output from the builder stage to the NGINX html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port that NGINX is listening on
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
