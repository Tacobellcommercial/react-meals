import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const mealsSlice = createSlice({
    name: "meals",
    initialState: [
        {name: "Barbeque Burger", price: 5.99},
        {name: "Beef Hotdog", price: 2.99},
        {name: "Pepperoni Pizza", price: 6.99},
        {name: "Fried Chicken", price: 4.99},
        {name: "Soda", price: 1.99},
        {name: "Tea", price: 0.99}
    ]
})

export default mealsSlice;