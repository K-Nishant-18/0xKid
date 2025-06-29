import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import errorHandler from "./middelweres/errorHandler.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes//user.router.js";
import aiRouter from "./routes/ai.route.js"

// API routes - matching frontend axios baseURL
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/ai", aiRouter);

// Health check endpoint
app.get("/api/v1/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running" });
});

app.use(errorHandler);

export { app };
