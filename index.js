import express from "express";
import dotenv from "dotenv";
dotenv.config();

import dbConnect from "./src/config/dbConnect.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import eventRoutes from "./src/routes/eventRoutes.js"; // Event Routes
import speakerRoutes from "./src/routes/speakerRoutes.js"; // Speaker Routes
// Connect to database
dbConnect();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/speakers", speakerRoutes);

// Start server
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
