import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const PlanetCards = ({ planet }) => {
  const [details, setDetails] = useState(null);
  const { dispatch } = useGlobalReducer();

  useEffect(() => {
    fetch(planet.url)
      .then((res) => res.json())
      .then((data) => setDetails(data.result.properties))
      .catch((err) => console.error("Failed to fetch planet details:", err));
  }, [planet.url]);

  const handleAddFavorite = () => {
    dispatch({
      type: "ADD_FAVORITE",
      payload: { name: planet.name, type: "planet" }
    });
  };

  const placeholderImage = "https://via.placeholder.com/400x200?text=Star+Wars+Planet";

  return (
    <div className="card m-3" style={{ width: "18rem" }}>
      <img
        src={placeholderImage}
        alt={planet.name}
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">{planet.name}</h5>
        {details ? (
          <>
            <p>🌦 Climate: {details.climate}</p>
            <p>🌍 Terrain: {details.terrain}</p>
            <p>👥 Population: {details.population}</p>
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-outline-warning"
                onClick={handleAddFavorite}
              >
                Add to Favorites
              </button>
              <Link to={`/details/${planet.uid}`} className="btn btn-info">
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