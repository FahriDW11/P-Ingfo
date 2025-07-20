# Step 1: Build client (React/Vite)
FROM node:18 AS client-build
WORKDIR /app/client
COPY client/ ./           # Salin isi folder client
RUN npm install
RUN npm run build         # Hasil build akan ada di /app/client/dist

# Step 2: Setup server
FROM node:18 AS server
WORKDIR /app

# Salin server source code
COPY server/ ./server

# Salin hasil build client ke dalam folder server (misalnya ./server/client-dist)
COPY --from=client-build /app/client/dist ./server/client-dist

# Install dependencies server
WORKDIR /app/server
RUN npm install

# Expose port backend (Express server)
EXPOSE 3333

# Jalankan server
CMD ["node", "src/index.js"]
