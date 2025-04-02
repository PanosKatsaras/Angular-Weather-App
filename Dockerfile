# Use the official Node.js image as the base image for building the app
FROM node:16-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Install Angular CLI locally (specific version for this project)
RUN npm install @angular/cli@13.2.3

# Copy the entire project to the working directory
COPY . .

# Dynamically create the environment.prod.ts file using the API_KEY build argument
ARG API_KEY
RUN echo "export const environment = { production: true, api_key: '${API_KEY}' };" > src/environments/environment.prod.ts

# Build the Angular app in production mode
RUN npm run build --prod

# Use the official Nginx Alpine image to serve the Angular app
FROM nginx:alpine

# Copy the built Angular app from the previous stage to the Nginx HTML directory
COPY --from=build /app/dist/weather_app /usr/share/nginx/html

# Expose port 80 to allow external access
EXPOSE 80

# Start Nginx to serve the application
CMD ["nginx", "-g", "daemon off;"]