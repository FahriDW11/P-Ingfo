# Step 1: Build client (Vite)
FROM node:18 AS client-build
WORKDIR /app/client
COPY client/ ./         
RUN npm install
RUN npm run build

# Step 2: Setup server
FROM node:18 AS server
WORKDIR /app

# Salin source server
COPY server/ ./server      
# Salin hasil build client ke folder server
COPY --from=client-build /app/client/dist ./server/client-dist

# Install dependencies server
WORKDIR /app/server
RUN npm install

EXPOSE 3333
CMD ["node", "src/server.js"]
