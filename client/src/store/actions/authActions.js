import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { wrapAsync } from "../../api/config/api.js";


export const googleOAuthHandler = createAsyncThunk('googleOAuthHandler', async (code, { rejectWithValue }) => {
    try {
        const result = await wrapAsync(() => api.get(`/auth/google?code=${code}`));
        return result;
    } catch (error) {
        const { message = "Something went Wrong while auth with google" } = error;
        return rejectWithValue({ message });
    }
})

export const logoutUser = createAsyncThunk('logoutUser', async (data, { rejectWithValue }) => {
    try {
        const result = await wrapAsync(() => api.get(`/auth/logout`));
        return result;
    } catch (error) {
        const { message = "Something went Wrong while auth with google" } = error;
        return rejectWithValue({ message });
    }
})