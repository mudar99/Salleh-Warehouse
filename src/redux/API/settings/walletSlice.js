import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { GetWalletStatusAPI, CreateWalletAPI, GetMyBalanceAPI } from "../../../API";

const cookie = new Cookies();
const token = cookie.get("jwt_store");


export const CreateWallet = createAsyncThunk("store/wallet/create", async (info, { rejectWithValue }) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        let { data } = await axios.post(CreateWalletAPI);
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const GetMyBalance = createAsyncThunk("store/wallet/balance", async (info, { rejectWithValue }) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        let { data } = await axios.get(GetMyBalanceAPI);
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const GetWalletStatus = createAsyncThunk("store/wallet/status", async (info, { rejectWithValue }) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        let { data } = await axios.get(GetWalletStatusAPI);
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const walletSlice = createSlice({
    name: "walletSlice",
    initialState: {
        walletBalance: null,
        walletStatus: null,
        btnLoading: null,
        loading: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(CreateWallet.pending, (state) => {
            state.btnLoading = true;
        }).addCase(CreateWallet.fulfilled, (state, { payload }) => {
            state.btnLoading = false;
        }).addCase(CreateWallet.rejected, (state, { payload }) => {
            state.btnLoading = false;
        })

        builder.addCase(GetMyBalance.pending, (state) => {
            state.loading = true;
        }).addCase(GetMyBalance.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.walletBalance = payload.data
        }).addCase(GetMyBalance.rejected, (state, { payload }) => {
            state.loading = false;
        })


        builder.addCase(GetWalletStatus.pending, (state) => {
            state.loading = true;
        }).addCase(GetWalletStatus.fulfilled, (state, { payload }) => {
            state.loading = false;
            payload.data === 1 ? state.walletStatus = true : state.walletStatus = false
        }).addCase(GetWalletStatus.rejected, (state, { payload }) => {
            state.loading = false;
        })

    }
});

export default walletSlice.reducer;