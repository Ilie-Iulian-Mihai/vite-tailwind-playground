import cors from "cors";
import { config } from "dotenv";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import deckRoutes from "./routes/deckRoutes";

config();

const PORT = 5000;
const app = express();
app.use(cors());

// allowing support for json post request (! PUT BEFORE ENDPOINTS ↓)
app.use(express.json());

app.use("/", deckRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Connected on port ${PORT}`);
  app.listen(PORT);
});
