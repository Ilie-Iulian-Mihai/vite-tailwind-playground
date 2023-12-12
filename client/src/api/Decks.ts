import { API_URL } from "./config";

export type TDeck = {
  title: string;
  _id: string;
};
//Delete deck in UI
export async function deleteDeck(deckId: string) {
  await fetch(`${API_URL}/decks/${deckId}`, {
    method: "DELETE",
  });
}

//Create a new deck
export async function createDeck(title: string) {
  const response = await fetch(`${API_URL}/decks`, {
    method: "POST",
    body: JSON.stringify({ title }),
    headers: { "Content-Type": "application/json" },
  });

  return response.json(); // Remember that with fetch, we have to .json()
}

export async function getDecks(): Promise<TDeck[]> {
  const response = await fetch(`${API_URL}/decks`);
  return response.json();
}
