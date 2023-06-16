import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { SendVerCodeAPI, VerificationAPI } from "../../../API";

const cookie = new Cookies();
const token = cookie.get("jwt_store");

export const sendVerificationCode = createAsyncThunk("store/code-verification/send", async (info, { rejectWithValue }) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        let { data } = await axios.post(SendVerCodeAPI);
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const checkVerificationCode = createAsyncThunk("store/code-verification/check", async (info, { rejectWithValue }) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        let { data } = await axios.post(VerificationAPI, info);
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});


export const mailVerSlice = createSlice({
    name: "mailVerSlice",
    initialState: {
        data: [],
        btnLoading: null,
        isDone: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(sendVerificationCode.pending, (state) => {
            state.btnLoading = true;
        }).addCase(sendVerificationCode.fulfilled, (state, { payload }) => {
            // state.data = payload.data;
            state.isDone = true;
            state.btnLoading = false;
        }).addCase(sendVerificationCode.rejected, (state, { payload }) => {
            state.btnLoading = false;
        })

        builder.addCase(checkVerificationCode.pending, (state) => {
            state.btnLoading = true;
        }).addCase(checkVerificationCode.fulfilled, (state, { payload }) => {
            // state.data = payload.data;
            state.btnLoading = false;
        }).addCase(checkVerificationCode.rejected, (state, { payload }) => {
            state.btnLoading = false;
        })

    }
});

export default mailVerSlice.reducer;