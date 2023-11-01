import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./App.css";

type TDeck = {
  title: string;
  _id: string;
};

function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCreateDeck = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/decks", {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: { "Content-Type": "application/json" },
    });

    const deck = await response.json(); // Remember that with fetch, we have to to .json()

    setDecks([...decks, deck]); // In order for React to rerender arr we have to pass in an arr refference
    setTitle("");
  };

  useEffect(() => {
    (async () => {
      //respons is JSON
      const response = await fetch("http://localhost:5000/decks");
      const newDecks = await response.json();
      setDecks(newDecks);
    })();
  }, []);

  const handleDelete = async (deckId: string) => {
    await fetch(`http://localhost:5000/decks/${deckId}`, {
      method: "DELETE",
    });
    setDecks(decks.filter((deck) => deck._id !== deckId));
  };

  return (
    <div className="App">
      <ul className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>
            <button onClick={() => handleDelete(deck._id)}>X</button>
            {deck.title}
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
