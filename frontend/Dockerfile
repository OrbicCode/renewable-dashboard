FROM node:22-alpine

# Create app directory
WORKDIR /app

# Copy root tsconfig
COPY tsconfig.json .

# Copy and build shared
COPY shared /app/shared
WORKDIR /app/shared
RUN npm install
RUN npm install typescript --save-dev
RUN npm run build

# Now frontend
WORKDIR /app/frontend
COPY frontend/package*.json .
RUN npm install
COPY frontend .
RUN npm run build

# For Vite dev server (or serve built files)
EXPOSE 5173
CMD ["npm", "run", "dev"]