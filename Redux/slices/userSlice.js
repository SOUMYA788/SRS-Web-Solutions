'use client'
import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        loggedIn: false,
        value: {}
    },
    reducers: {
        userLoggedIn: (state, action) => {
            state.loggedIn = action.payload
        },
        assignUser: (state, action) => {
            state.value = action.payload
        },
        removeUser: (state) => {
            state.value = {}
        }
    }
})

export const { userLoggedIn, assignUser, removeUser } = userSlice.actions;

export default userSlice.reducer;   