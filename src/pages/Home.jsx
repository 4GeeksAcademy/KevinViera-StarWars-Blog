import React, { useEffect } from "react";
import { CharacterCards } from "../components/CharacterCards";
import { PlanetCards } from "../components/PlanetCards";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  // Fetch characters
  useEffect(() => {
    fetch("https://www.swapi.tech/api/people")
      .then(res => res.json())
      .then(data => {
        const characters = data.results || [];
        dispatch({ type: "SET_CHARACTERS", payload: characters });
      })
      .catch(err => console.error("Error fetching characters:", err));
  }, []);

  // Fetch planets
  useEffect(() => {
    fetch("https://www.swapi.tech/api/planets")
      .then(res => res.json())
      .then(data => {
        const planets = data.results || [];
        dispatch({ type: "SET_PLANETS", payload: planets });
      })
      .catch(err => console.error("Error fetching planets:", err));
  }, []);

  return (
    <div className="container my-5">
      <h2 className="mb-4">Characters</h2>
      <div className="d-flex flex-wrap">
        {(store.characters || []).map(character => (
          <CharacterCards key={character.uid} character={character} />
        ))}
      </div>

      <h2 className="mb-4 mt-5">Planets</h2>
      <div className="d-flex flex-wrap">
        {(store.planets || []).map(planet => (
          <PlanetCards key={planet.uid} planet={planet} />
        ))}
      </div>
    </div>
  );
};