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
export async function deleteDecks(req: Request, res: Response) {
  //get the deck ID from the url
  const deckId = req.params.decksId;
  //delete the deck from MongoDB
  const deck = await Deck.findByIdAndDelete(deckId);
  //return the deleted deck to the user who made the request
  res.json(deck);
}
