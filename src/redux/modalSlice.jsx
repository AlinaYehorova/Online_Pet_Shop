import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  title: null,
  price: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, {payload}) => {
      state.isOpen = true;
      state.title = payload.title;
      state.price = payload.price
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.title = null;
      state.contentId = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;

