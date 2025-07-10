export const initialStore = {
  characters: [],
  planets: [],
  favorites: []
};

export const storeReducer = (state, action) => {
  switch (action.type) {
    case "SET_CHARACTERS":
      return { ...state, characters: action.payload };

    case "SET_PLANETS":
      return { ...state, planets: action.payload };

    case "ADD_FAVORITE":
      const exists = state.favorites.some(
        fav => fav.name === action.payload.name && fav.type === action.payload.type
      );
      if (exists) return state;

      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(
          fav => fav.name !== action.payload.name || fav.type !== action.payload.type
        )
      };

    default:
      console.error("Unknown action:", action.type);
      return state;
  }
};

