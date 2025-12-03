FROM node:22-alpine

# Create app directory
WORKDIR /app

# Copy root tsconfig (for extends)
COPY tsconfig.json .

# Copy and build shared
COPY shared /app/shared
WORKDIR /app/shared
RUN npm install
RUN npm install typescript --save-dev
RUN npm run build

# Now backend
WORKDIR /app/backend
COPY backend/package*.json .
RUN npm install
COPY backend .
RUN npm run build

# Expose and run
EXPOSE 3000
CMD ["npm", "start"]