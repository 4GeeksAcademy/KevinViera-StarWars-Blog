import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const CharacterCards = ({ character }) => {
  const [details, setDetails] = useState(null);
  const { dispatch } = useGlobalReducer();

  useEffect(() => {
    fetch(character.url)
      .then((res) => res.json())
      .then((data) => setDetails(data.result.properties))
      .catch((err) => console.error("Failed to fetch character details:", err));
  }, [character.url]);

  const handleAddFavorite = () => {
    dispatch({ type: "ADD_FAVORITE", payload: { name: character.name, type: "character" } });
  };

  const placeholderImage = "https://dummyjson.com/image/400x200?type=webp";

  return (
    <div className="card m-3" style={{ width: "18rem" }}>
      <img
        src={placeholderImage}
        alt={character.name}
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">{character.name}</h5>
        {details ? (
          <>
            <p>Gender: {details.gender}</p>
            <p>Height: {details.height} cm</p>
            <p>Birth Year: {details.birth_year}</p>
            <div className="d-flex justify-content-between">
              <button className="btn btn-outline-warning" onClick={handleAddFavorite}>
                Add to Favorites
              </button>
              <Link to={`/details/${character.uid}`} className="btn btn-info">
                Learn More
              </Link>
            </div>
          </>
        ) : (
          <p>Loading details...</p>
        )}
      </div>
    </div>
  );
};