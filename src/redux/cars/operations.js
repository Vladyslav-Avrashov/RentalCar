import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchCarsThunk = createAsyncThunk(
  "cars/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    const { cars } = getState();
    const { page, filters } = cars;

    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", 12);

    if (filters.brand) params.append("brand", filters.brand);
    if (filters.rentalPrice) params.append("rentalPrice", filters.rentalPrice);
    if (filters.mileage.from) params.append("minMileage", filters.mileage.from);
    if (filters.mileage.to) params.append("maxMileage", filters.mileage.to);

    try {
      const { data } = await api.get("/cars", { params });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCarByIdThunk = createAsyncThunk(
  "cars/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/cars/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBrandsThunk = createAsyncThunk(
  "cars/fetchBrands",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/brands");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
