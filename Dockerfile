# STAGE 1: Build the static site
FROM node:22-alpine AS builder
WORKDIR /app

# Copy dependency files and install
COPY package*.json ./
RUN npm ci

# Copy the rest of the code and build the Astro project
COPY . .
RUN npm run build

# STAGE 2: Serve the ultra-lean site
FROM nginx:alpine
# Copy the compiled HTML/CSS from the builder stage into Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 inside the container
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
