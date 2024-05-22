import { configureStore } from "@reduxjs/toolkit";
import centerDataReducer from "./centerSlice.jsx";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import {thunk} from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  rootProperty: "centerData",
};

const persistedCenterData = persistReducer(persistConfig, centerDataReducer);

const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(thunk);

export const store = configureStore({
  reducer: persistedCenterData,
  middleware,
});

export const persistor = persistStore(store);
