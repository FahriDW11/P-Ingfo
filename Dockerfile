# Step 2: Setup server
FROM node:18 AS server
WORKDIR /app

# Salin source server
COPY server/ ./server      
# Salin hasil build client ke path yang diharapkan server.js
COPY --from=client-build /app/client/dist ./client/dist

# Install dependencies server
WORKDIR /app/server
RUN npm install

EXPOSE 3333
CMD ["node", "src/server.js"]