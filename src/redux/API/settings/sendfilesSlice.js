import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { SendAuthFilesAPI } from "../../../API";

const cookie = new Cookies();
const token = cookie.get("jwt_store");

export const sendAuthFiles = createAsyncThunk("store/authfiles/send", async (info, { rejectWithValue }) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        let { data } = await axios.post(SendAuthFilesAPI, info);
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});


export const sendfilesSlice = createSlice({
    name: "sendfilesSlice",
    initialState: {
        data: [],
        btnLoading: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(sendAuthFiles.pending, (state) => {
            state.btnLoading = true;
        }).addCase(sendAuthFiles.fulfilled, (state, { payload }) => {
            // state.data = payload.data;
            state.btnLoading = false;
        }).addCase(sendAuthFiles.rejected, (state, { payload }) => {
            state.btnLoading = false;
        })

    }
});

export default sendfilesSlice.reducer;