'use client'
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import userOrdersSlice from "./slices/userOrdersSlice";

export default configureStore({
    reducer: {
        user: userSlice,
        order: userOrdersSlice
    }
})