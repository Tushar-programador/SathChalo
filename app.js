import express from "express";
import cors from "cors";
import xss from 'xss-clean';
import cookieParser from "cookie-parser";
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { errorHandler } from './middleware/errorHandler.js';

import { autoExpireRides } from './utils/cronJobs.js';
autoExpireRides(); // ⏰ start auto-expiry job

const app = express();
app.use(errorHandler); 
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);
app.use(helmet());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 10, // limit each IP to 10 login requests per windowMs
  message: 'Too many login attempts from this IP, please try again after 15 minutes'
});
app.use(xss());

app.use('/api/auth/login', authLimiter);
app.use(morgan('dev'));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


import { router } from "./routes/index.js";
app.use("/api", router);
export { app };
