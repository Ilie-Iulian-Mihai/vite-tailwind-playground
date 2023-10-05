import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCreateDeck = async (e: FormEvent) => {
    e.preventDefault();

    await fetch("http://localhost:5000/decks", {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: { "Content-Type": "application/json" },
    });

    setTitle("");
  };

  return (
    <div className="App">
      <form className="flex flex-col gap-5 " onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck Title</label>
        <input id="deck-title" value={title} onChange={handleInput} />
        <button>Create Deck</button>
      </form>
    </div>
  );
}

export default App;
