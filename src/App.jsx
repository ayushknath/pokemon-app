import { useState, useEffect } from "react";
import Pokemon from "./components/Pokemon";
import axios from "axios";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [currentUrl, setCurrentUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [prevPageUrl, setPrevPageUrl] = useState("");
  const [nextPageUrl, setNextPageUrl] = useState("");

  useEffect(() => {
    setErrorMessage("");
    setLoading(true);
    setError(false);
    axios
      .get(currentUrl)
      .then((res) => {
        setPokemons(() => res.data.results.map((result) => result.name));
        setPrevPageUrl(res.data.previous);
        setNextPageUrl(res.data.next);
        setErrorMessage("");
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setLoading(false);
        setError(true);
      });
  }, [currentUrl]);

  function gotoPrevPage() {
    setCurrentUrl(prevPageUrl);
  }

  function gotoNextPage() {
    setCurrentUrl(nextPageUrl);
  }

  if (loading) return "Loading...";
  if (error) return `Error: ${errorMessage}`;

  return (
    <>
      <Pokemon pokemons={pokemons} />
      {prevPageUrl && (
        <button onClick={gotoPrevPage} aria-label="Navigate to previous page">
          Previous
        </button>
      )}
      {nextPageUrl && (
        <button onClick={gotoNextPage} aria-label="Navigate to next page">
          Next
        </button>
      )}
    </>
  );
}

export default App;
