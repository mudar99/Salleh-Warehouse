import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { AcceptPurchaseOrderAPI, GetPurchaseOrdersAPI, RejectPurchaseOrderAPI } from "../../../API";

const cookie = new Cookies();
const token = cookie.get("jwt_store");
export const GetPurchases = createAsyncThunk("storehouse/Purchases/get", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetPurchaseOrdersAPI + info.size + "&page=" + info.page);
    console.log(data)
    return data;
});
export const AcceptPurshaseOrder = createAsyncThunk("storehouse/Purchases/accept", async (info, { rejectWithValue }) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        let { data } = await axios.post(AcceptPurchaseOrderAPI);
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const RejectPurchaseOrder = createAsyncThunk("storehouse/Purchases/reject", async (info, { rejectWithValue }) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        let { data } = await axios.post(RejectPurchaseOrderAPI);
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const purchaseSlice = createSlice({
    name: "purchaseSlice",
    initialState: {
        data: [],
        btnLoading: null,
        loading: null,
        totalItems: "",
        currentPage: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetPurchases.pending, (state) => {
            state.loading = true;
        }).addCase(GetPurchases.fulfilled, (state, { payload }) => {
            console.log(payload)
            state.data = payload.data;
            state.totalItems = payload.data.total
            state.currentPage = payload.data.current_page
            state.loading = false;
        }).addCase(GetPurchases.rejected, (state, { payload }) => {
            state.loading = false;
        })

        builder.addCase(AcceptPurshaseOrder.pending, (state) => {
            state.btnLoading = true;
        }).addCase(AcceptPurshaseOrder.fulfilled, (state, { payload }) => {
            // state.data = payload.data;
            state.btnLoading = false;
        }).addCase(AcceptPurshaseOrder.rejected, (state, { payload }) => {
            state.btnLoading = false;
        })

        builder.addCase(RejectPurchaseOrder.pending, (state) => {
            state.btnLoading = true;
        }).addCase(RejectPurchaseOrder.fulfilled, (state, { payload }) => {
            // state.data = payload.data;
            state.btnLoading = false;
        }).addCase(RejectPurchaseOrder.rejected, (state, { payload }) => {
            state.btnLoading = false;
        })
    }
});

export const { } = purchaseSlice.actions;

export default purchaseSlice.reducer;