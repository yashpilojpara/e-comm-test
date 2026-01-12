import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("cartItems"));

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: savedCart || [],

    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }

            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },

        decreaseQuantity: (state, action) => {
            const item = state.items.find(
                (item) => item.id === action.payload
            );
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },

        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem("cartItems");
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    decreaseQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
