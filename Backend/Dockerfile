FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies (production only)
RUN npm install --omit=dev

COPY . .

# Expose the API port
EXPOSE 5000

# Use PM2 or directly start the app (assuming direct start for docker)
CMD ["node", "server.js"]
