import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import carsReducer from "./cars/slice";
import { favsReducer } from "./favs/slice";

const persistConfig = {
  key: "favs",
  version: 1,
  storage,
};

const persistedFavsReducer = persistReducer(persistConfig, favsReducer);

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    favs: persistedFavsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
