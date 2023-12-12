import cors from "cors";
import { config } from "dotenv";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import deckRoutes from "./routes/deckRoutes";

config();

const app = express();
app.use(cors());

const { PORT, MONGO_URL } = process.env;

// allowing support for json requests (! PUT BEFORE ENDPOINTS ↓)
app.use(express.json());

app.use("/", deckRoutes);

// Database connection
mongoose.connect(MONGO_URL!).then(() => {
  console.log(`Connected on port ${PORT}`);
  app.listen(PORT);
});
