import express from "express";
import cors from "cors";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import { errorMiddleware } from "./middlewares/error.js";

const app = express();
config({ path: "./config/config.env" });

app.use(
  cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL, DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Include all necessary methods
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors());

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Routers
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

dbConnection();
app.use(errorMiddleware);

export default app;
