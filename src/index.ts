import "dotenv/config";

import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";

import "./config/env";
import "./utils/mongodb";

import router from "./routes/index";

const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.use("*", (_req, res) => {
  res.status(404).json({ error: "❌ Route not found!" });
});

app.listen(process.env.PORT, () => {
  console.log(`✅ Server running on port ${process.env.PORT}`);
});
