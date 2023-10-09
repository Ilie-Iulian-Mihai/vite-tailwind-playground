import cors from "cors";
import { config } from "dotenv";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Deck from "./models/Deck";

config();

const PORT = 5000;
const app = express();
app.use(cors());

// allowing support for json post request (! PUT BEFORE ENDPOINTS ↓)
app.use(express.json());

// API's settup
app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

// GET for "/decks"
app.get("/decks", async (req, res) => {
  try {
    // fetch all the decks form MongoDB
    const decks = await Deck.find();
    // send back the array to the UI
    res.json(decks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/", (req, res) => {
  res.send("");
});

// Database connection
mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Connected on port ${PORT}`);
  app.listen(PORT);
});
