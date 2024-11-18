import { createSlice } from "@reduxjs/toolkit"
import { googleOAuthHandler, logoutUser } from "../actions/authActions";

const initialState = {
    loading: false,
    error: null,
    user: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null
}

const authSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {
        set: (state, action) => {
            state.user = action.payload;
        },
        reset: (state, action) => {
            localStorage.removeItem('user');
            state.loading = false;
            state.error = null;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(googleOAuthHandler.pending, (state, action) => {
            state.loading = true;
            state.error = false;
            state.user = null;
        })
        builder.addCase(googleOAuthHandler.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message || "Something went wrong";
            state.user = null;
        })
        builder.addCase(googleOAuthHandler.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.user = action.payload.user;

            localStorage.setItem('user', JSON.stringify(action.payload.user))
        })

        builder.addCase(logoutUser.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.error = action.payload.message;
            state.loading = false;
        })
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = null;
            state.error = null;
            localStorage.clear();
        })
    }
})

export const { set, reset } = authSlice.actions;

export default authSlice.reducer;