import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

const app = express();

const corsOptions = {
    origin: "http://localhost:5173", // Only allow this domain
};

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // 100 requests per IP
    standardHeaders: "draft-8",
    legacyHeaders: false,
});

// Middlewares
app.use(helmet());
app.use(cors(corsOptions));
app.use(globalLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Routers
import sharesRouter from './routes/shares.js'

app.use('/shares', sharesRouter);
app.get("/health", (_req, res) => {
    res.json({ status: "OK" });
});

export default app;
