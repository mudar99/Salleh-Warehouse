import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { AcceptPurchaseOrderAPI, GetAcceptedPurchaseOrdersAPI, GetRejectedPurchaseOrdersAPI, GetWaitingPurchaseOrdersAPI, RejectPurchaseOrderAPI } from "../../../API";

const cookie = new Cookies();
const token = cookie.get("jwt_store");
export const GetWaitingPurchases = createAsyncThunk("storehouse/purchases/waiting/get", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetWaitingPurchaseOrdersAPI + info.size + "&page=" + info.page);
    console.log(data)
    return data;
});

export const GetAcceptedPurchases = createAsyncThunk("storehouse/purchases/accepted/get", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetAcceptedPurchaseOrdersAPI + info.size + "&page=" + info.page);
    console.log(data)
    return data;
});

export const GetRejectedPurchases = createAsyncThunk("storehouse/purchases/rejected/get", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetRejectedPurchaseOrdersAPI + info.size + "&page=" + info.page);
    console.log(data)
    return data;
});

export const AcceptPurshaseOrder = createAsyncThunk("storehouse/purchases/accept", async (id, { rejectWithValue }) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        let { data } = await axios.put(AcceptPurchaseOrderAPI + id);
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const RejectPurchaseOrder = createAsyncThunk("storehouse/purchases/reject", async (id, { rejectWithValue }) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        let { data } = await axios.put(RejectPurchaseOrderAPI + id);
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
        loading: null,
        totalItems: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetWaitingPurchases.pending, (state) => {
            state.loading = true;
        }).addCase(GetWaitingPurchases.fulfilled, (state, { payload }) => {
            console.log(payload)
            state.data = payload.data.data;
            state.totalItems = payload.data.total
            state.loading = false;
        }).addCase(GetWaitingPurchases.rejected, (state, { payload }) => {
            state.loading = false;
        })

        builder.addCase(GetAcceptedPurchases.pending, (state) => {
            state.loading = true;
        }).addCase(GetAcceptedPurchases.fulfilled, (state, { payload }) => {
            console.log(payload)
            state.data = payload.data.data;
            state.totalItems = payload.data.total
            state.loading = false;
        }).addCase(GetAcceptedPurchases.rejected, (state, { payload }) => {
            state.loading = false;
        })
        builder.addCase(GetRejectedPurchases.pending, (state) => {
            state.loading = true;
        }).addCase(GetRejectedPurchases.fulfilled, (state, { payload }) => {
            console.log(payload)
            state.data = payload.data.data;
            state.totalItems = payload.data.total
            state.loading = false;
        }).addCase(GetRejectedPurchases.rejected, (state, { payload }) => {
            state.loading = false;
        })

        builder.addCase(AcceptPurshaseOrder.pending, (state) => {
            state.loading = true;
        }).addCase(AcceptPurshaseOrder.fulfilled, (state, { payload }) => {
            state.loading = false;
        }).addCase(AcceptPurshaseOrder.rejected, (state, { payload }) => {
            state.loading = false;
        })

        builder.addCase(RejectPurchaseOrder.pending, (state) => {
            state.loading = true;
        }).addCase(RejectPurchaseOrder.fulfilled, (state, { payload }) => {
            state.loading = false;
        }).addCase(RejectPurchaseOrder.rejected, (state, { payload }) => {
            state.loading = false;
        })
    }
});

export default purchaseSlice.reducer;