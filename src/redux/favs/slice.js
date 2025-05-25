import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};

const favsSlice = createSlice({
  name: "favs",
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const carId = action.payload;
      if (state.favorites.includes(carId)) {
        state.favorites = state.favorites.filter((id) => id !== carId);
      } else {
        state.favorites.push(carId);
      }
    },
  },
});

export const { toggleFavorite } = favsSlice.actions;
export const favsReducer = favsSlice.reducer;
