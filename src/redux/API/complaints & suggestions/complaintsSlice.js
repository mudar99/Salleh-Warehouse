import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { GetComplaintsAPI, AddComplaintAPI } from "../../../API";

const cookie = new Cookies();
const token = cookie.get("jwt_store");
export const GetComplaints = createAsyncThunk("storehouse/complaints/get", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetComplaintsAPI + info.size + "&page=" + info.page);
    console.log(data)
    return data;
});
export const AddComplaintService = createAsyncThunk("storehouse/complaints/add", async (info, { rejectWithValue }) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        let { data } = await axios.post(AddComplaintAPI, info);
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const complaintsSlice = createSlice({
    name: "complaintsSlice",
    initialState: {
        data: [],
        btnLoading: null,
        loading: null,
        totalItems: "",
        currentPage: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetComplaints.pending, (state) => {
            state.loading = true;
        }).addCase(GetComplaints.fulfilled, (state, { payload }) => {
            state.data = payload.data.data;
            state.totalItems = payload.data.total
            state.currentPage = payload.data.current_page
            state.loading = false;
        }).addCase(GetComplaints.rejected, (state, { payload }) => {
            state.loading = false;
        })

        builder.addCase(AddComplaintService.pending, (state) => {
            state.btnLoading = true;
        }).addCase(AddComplaintService.fulfilled, (state, { payload }) => {
            // state.data = payload.data;
            state.btnLoading = false;
        }).addCase(AddComplaintService.rejected, (state, { payload }) => {
            state.btnLoading = false;
        })

    }
});

export default complaintsSlice.reducer;