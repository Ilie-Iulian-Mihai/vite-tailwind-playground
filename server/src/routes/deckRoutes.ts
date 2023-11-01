import express from "express";
import { getDecks, postDecks } from "../controllers/deckControllers";

const router = express.Router();

router.get("/decks", getDecks);
router.post("/decks", postDecks);
router.delete("/decks/:deckId", postDecks);

export default router;
