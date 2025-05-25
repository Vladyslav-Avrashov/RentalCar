// carsSlice.js
import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  fetchCarsThunk,
  fetchCarByIdThunk,
  fetchBrandsThunk,
} from "./operations";

const initialState = {
  items: [],
  selectedCar: null,
  brands: [],
  page: 1,
  hasMore: true,
  filters: {
    brand: "",
    rentalPrice: "",
    mileage: { from: "", to: "" },
  },
  favorites: [],
  loading: false,
  error: null,
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    updateFilterValue(state, action) {
      const { field, value, subField } = action.payload;
      if (field === "mileage" && subField) {
        if (!state.filters.mileage) {
          state.filters.mileage = { from: "", to: "" };
        }
        state.filters.mileage[subField] = value;
      } else if (field !== "mileage") {
        if (field in state.filters) {
          state.filters[field] = value;
        }
      }
    },
    applyFilters(state) {
      state.page = 1;
      state.items = [];
      state.hasMore = true;
    },
    resetCars(state) {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
    },
    incrementPage(state) {
      state.page += 1;
    },
    toggleFavorite(state, action) {
      const carId = action.payload;
      if (state.favorites.includes(carId)) {
        state.favorites = state.favorites.filter((id) => id !== carId);
      } else {
        state.favorites.push(carId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarsThunk.fulfilled, (state, action) => {
        const newCars = Array.isArray(action.payload)
          ? action.payload
          : action.payload.cars || [];

        if (state.page === 1) {
          state.items = newCars;
        } else {
          state.items.push(...newCars);
        }
        state.hasMore = newCars.length === 12;
        state.loading = false;
      })
      .addCase(fetchCarByIdThunk.fulfilled, (state, action) => {
        state.selectedCar = action.payload;
        state.loading = false;
      })
      .addCase(fetchBrandsThunk.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.loading = false;
      })
      .addMatcher(
        isPending(fetchCarsThunk, fetchCarByIdThunk, fetchBrandsThunk),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isRejected(fetchCarsThunk, fetchCarByIdThunk, fetchBrandsThunk),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message;
        }
      );
  },
});

export const {
  updateFilterValue,
  applyFilters,
  resetCars,
  incrementPage,
  toggleFavorite,
} = carsSlice.actions;

export default carsSlice.reducer;
