import { configureStore } from "@reduxjs/toolkit";
import Slice from "./Slice";

export const store = configureStore({
    reducer:{
        Slice,
    }
})

export type RootState = ReturnType<typeof store.getState>

