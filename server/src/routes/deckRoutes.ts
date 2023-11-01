import express from "express";
import {
  deleteDeck,
  getDecks,
  postDecks,
} from "../controllers/deckControllers";

const router = express.Router();

router.get("/decks", getDecks);
router.post("/decks", postDecks);
router.delete("/decks/:deckId", deleteDeck);

export default router;
