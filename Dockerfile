# Step 1: Build client
FROM node:18 AS client-build
WORKDIR /app/client
COPY P-Ingfo/client/ ./        
RUN npm install
RUN npm run build

# Step 2: Build server
FROM node:18 AS server
WORKDIR /app
COPY P-Ingfo/server/ ./server
COPY --from=client-build /app/client/dist ./server/client-dist

WORKDIR /app/server
RUN npm install

EXPOSE 5000
CMD ["node", "src/index.js"]
