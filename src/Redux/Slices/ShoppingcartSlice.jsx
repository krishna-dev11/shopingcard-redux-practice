import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0
};

export const ShoppingcartSlice = createSlice({
    name: "DisplayShopItem",
    initialState,
    reducers: {
        add: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.price * existingItem.quantity;
            } else {
                state.items.push({
                    ...newItem,
                    quantity: 1,
                    totalPrice: newItem.price
                });
            }
            state.totalQuantity++;
            state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
        },
        remove: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            
            if (existingItem) {
                if (existingItem.quantity === 1) {
                    state.items = state.items.filter(item => item.id !== id);
                } else {
                    existingItem.quantity--;
                    existingItem.totalPrice = existingItem.price * existingItem.quantity;
                }
                state.totalQuantity--;
                state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        }
    }
});

export const { add, remove, clearCart } = ShoppingcartSlice.actions;
export default ShoppingcartSlice.reducer;
