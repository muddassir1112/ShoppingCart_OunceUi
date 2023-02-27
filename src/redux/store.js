import { configureStore } from "@reduxjs/toolkit";
import AppReducer from "../redux/AppSlice";

export const store = configureStore({
  reducer: {
    eCommerceApp: AppReducer,
  },
});
