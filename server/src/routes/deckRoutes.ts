import express from "express";
import {
  deleteDeck,
  getDecks,
  postDecks,
} from "../controllers/deckControllers";
import { createCard } from "../controllers/cardController";

const router = express.Router();

router.get("/decks", getDecks);
router.post("/decks", postDecks);
router.post("/decks/:deckId/cards", createCard);
router.delete("/decks/:deckId", deleteDeck);

export default router;
