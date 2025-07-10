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
      return { ...state, favorites: [...state.favorites, action.payload] };

    default:
      console.error("Unknown action:", action.type);
      return state;
  }
};

