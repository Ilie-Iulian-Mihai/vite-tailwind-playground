import { Request, Response } from "express";
import Deck from "../models/Deck";

//GET decks
export async function getDecks(req: Request, res: Response) {
  try {
    // fetch all the decks form MongoDB
    const decks = await Deck.find();
    // send back the array to the UI
    res.json(decks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//POST decks
export async function postDecks(req: Request, res: Response) {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
}

//DELETE decks
export async function deleteDeck(req: Request, res: Response) {
  try {
    const deckId = req.params.deckId;
    const deletedDeck = await Deck.findByIdAndDelete(deckId);

    if (!deletedDeck) {
      return res.status(404).json({ error: "Deck not found" });
    }

    res.json(deletedDeck);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
