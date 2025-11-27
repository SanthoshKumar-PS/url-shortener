import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import {apiRouter} from './routes/apiRouter'
import {shortenerRouter} from './routes/shortenerRouter'
const prisma = new PrismaClient();
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      const allowAll = !origin || allowedOrigins.includes(origin);
      if (allowAll) {
        callback(null, true);
      } else {
        console.error("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  })
);

app.use(express.json());

app.get("/healthz", (req, res) => {
  return res.status(200).json({
    message:
      process.env.NODE_ENV === "development"
        ? "Development server is running"
        : "Production server is running",
  });
});

app.use('/',shortenerRouter)
app.use('/api/links',apiRouter)


const BACKEND_PORT = 5000;
app.listen(BACKEND_PORT, () => {
  console.log("Running on port " + BACKEND_PORT);
});

export default app;
