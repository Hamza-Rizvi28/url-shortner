# Use an existing node alpine image as a base image.
FROM node:20

# Set the working directory.
WORKDIR /app

# Copy the package.json file.
COPY package.json .

# Install application dependencies.
RUN npm install

# Copy the rest of the application files.
COPY . .

# Expose the port.
EXPOSE 5173

# Run the application.
CMD ["npm", "run", "dev", "--", "--host"]