import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { TDeck, createDeck, deleteDeck, getDecks } from "./api/Decks";

function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCreateDeck = async (e: FormEvent) => {
    e.preventDefault();
    const deck = await createDeck(title);
    setDecks([...decks, deck]); // In order for React to rerender arr we have to pass in an arr refference
    setTitle("");
  };

  useEffect(() => {
    (async () => {
      const newDecks: TDeck[] = await getDecks();
      setDecks(newDecks);
    })();
  }, []);

  const handleDeleteDeck = async (deckId: string) => {
    await deleteDeck(deckId);
    setDecks(decks.filter((deck) => deck._id !== deckId));
  };

  return (
    <div className="App">
      <ul className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>
            <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
            <Link to={`/decks/${deck._id}`}>{deck.title}</Link>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck Title</label>
        <input id="deck-title" value={title} onChange={handleInput} />
        <button>Create Deck</button>
      </form>
    </div>
  );
}

export default App;
