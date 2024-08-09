import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    modal: modalSlice,
    cart: cartSlice,
  },
  devTools: true,
});

export default store;
