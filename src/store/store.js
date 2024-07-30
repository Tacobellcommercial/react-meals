import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import mealsSlice from "./mealsSlice";

const store = configureStore({
    reducer: {"user": userSlice.reducer, "meals": mealsSlice.reducer}
})

export default store;