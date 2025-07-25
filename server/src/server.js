import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import tasksRoute from "./routes/tasksRoute.js";
import authRoute from "./routes/authRoute.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// Middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173", // Adjust this to your client URL
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );
}
app.use(express.json());
app.use(rateLimiter);

app.use("/api/tasks", tasksRoute);
app.use("/api/auth", authRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

//connect to database then run the app
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });
});
