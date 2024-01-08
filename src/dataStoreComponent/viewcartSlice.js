// viewcartSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CartItemsQnty: 0,
  
};

export const counterSlice = createSlice({
  name: "viewCart",
  initialState,
  reducers: {
    setInitialQuantity: (state, action) => {
      state.CartItemsQnty = action.payload;
      console.log("state.CartItemsQnty", state.CartItemsQnty);
    },
    increment: (state) => {
      state.CartItemsQnty += 1;
    },
    decrement: (state) => {
      if (state.CartItemsQnty <= 0) {
        state.CartItemsQnty = 0;
      } else {
        state.CartItemsQnty -= 1;
      }
    },
    incrementByAmount: (state, action) => {
      state.CartItemsQnty += action.payload;
    },
  },
});

export const { increment, decrement, setInitialQuantity, incrementByAmount } =
  counterSlice.actions;

export default counterSlice.reducer;
