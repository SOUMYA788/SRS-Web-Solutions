"use client"

import { createSlice } from "@reduxjs/toolkit"

const orderSlice = createSlice({
    name: "order",
    initialState: {
        value: null
    },
    reducers: {
        updateOrder: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { updateOrder } = orderSlice.actions;
export default orderSlice.reducer