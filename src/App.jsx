import { useEffect, useState } from "react";
import MovieCard from "./MovieCard.jsx";
import "./App.css";
import SearchIcon from "./search.svg";

const API_URL = "http://www.omdbapi.com?apikey=144085b4";

const movie1 = {
  Title: "Solo Leveling",
  Year: "2024",
  imdbID: "tt21209876",
  Type: "series",
  Poster: "https://m.media-amazon.com/images/M/MV5BODJkZTM3MWYtOTkxNS00YWUxLTg5NjAtOTk4ZWM5MTBmMzAyXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg",
};

export default function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input placeholder="Search for movies" value={searchQuery} onChange={handleInputChange} />
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchQuery)} />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>NO movies found</h2>
        </div>
      )}
    </div>
  );
}
