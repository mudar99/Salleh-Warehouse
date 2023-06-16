import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import axios from "axios";
import { SendResetPaswwordCodeAPI, ResetPaswwordAPI } from "../../../API";


export const SendResetPasswordCode = createAsyncThunk("store/mail/send", async (email, { rejectWithValue }) => {
    try {
        let { data } = await axios.post(SendResetPaswwordCodeAPI, email);
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const SaveResetPassword = createAsyncThunk("store/mail/reset", async (info, { rejectWithValue }) => {
    try {
        let { data } = await axios.post(ResetPaswwordAPI, info);
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const passResetSlice = createSlice({
    name: "passResetSlice",
    initialState: {
        btnLoading: null,
        isDone: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(SendResetPasswordCode.pending, (state) => {
            state.btnLoading = true;
        }).addCase(SendResetPasswordCode.fulfilled, (state, { payload }) => {
            state.btnLoading = false;
            state.isDone = true;
        }).addCase(SendResetPasswordCode.rejected, (state, { payload }) => {
            state.btnLoading = false;
        })

        builder.addCase(SaveResetPassword.pending, (state) => {
            state.btnLoading = true;
        }).addCase(SaveResetPassword.fulfilled, (state, { payload }) => {
            state.btnLoading = false;
            state.isDone = false;
        }).addCase(SaveResetPassword.rejected, (state, { payload }) => {
            state.btnLoading = false;
        })

    }
});

export default passResetSlice.reducer;