import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  html: "",
  css: "",
  javascript: "",
  currentLanguage: "html",
};

const Slice = createSlice({
  name: "Slice",
  initialState,
  reducers: {
    updateCurrentLanguage: (state, action: PayloadAction<string>) => {
      state.currentLanguage = action.payload;
    },
  },
});

export const {updateCurrentLanguage} = Slice.actions

export default Slice.reducer;
