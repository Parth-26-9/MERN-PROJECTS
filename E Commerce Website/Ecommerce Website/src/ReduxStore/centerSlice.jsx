import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const centerDataSlice = createSlice({
  name: "centerDataSlice",
  initialState: {
    token: "",
    storeCartMessage: "",
    cartItems: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.cartItems.push(action.payload);
    },

    removeItem: (state, action) => {
      state.cartItems.pop();
    },
    clearCart: (state, action) => {
      state.cartItems = [];
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setStoreCartMessage: (state, action) => {
      state.storeCartMessage = action.payload;
    },
  },
});

const persistConfig = {
  key: "centerData",
  storage,
};

const persistedCenterDataReducer = persistReducer(
  persistConfig,
  centerDataSlice.reducer
);

export const { addItem, removeItem, clearCart, setToken,setStoreCartMessage } =
  centerDataSlice.actions;
export default persistedCenterDataReducer;
