import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {cart: [], username: "", loggedIn: false},
    reducers: {
        addItemToCart(state, action){
            state.cart.push({name: action.payload.name, price: action.payload.price, id: action.payload.id})
        },
        removeItemFromCart(state, action){
            const newCart = [];

            state.cart.forEach(e=>{
                if (e.id != action.payload.id){
                    newCart.push(e);
                }
            })

            state.cart = newCart;
        },
        login(state, action){
            state.loggedIn = true;
            state.cart = action.payload.cart;
        },
        logout(state){
            state.cart = [];
            state.loggedIn = false;
        }
    }
})

export const { addItemToCart, removeItemFromCart, login, logout } = userSlice.actions;
export default userSlice;