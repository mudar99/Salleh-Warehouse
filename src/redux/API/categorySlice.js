import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { GetCategoriesAPI } from "../../API";
const cookie = new Cookies();
const token = cookie.get("jwt_store");



export const GetCategories = createAsyncThunk("storehouse/categories/get", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let api;
    if (info.id === undefined && info.load === undefined) {
        api = `${GetCategoriesAPI}?size=${info.size}&page=${info.page}&capacity=${info.capacity}`;
    }
    else {
        api = `${GetCategoriesAPI + info.id}/${info.load}?size=${info.size}&page=${info.page}&capacity=${info.capacity}`;
        console.log(api)
    }
    let { data } = await axios.get(api);
    console.log(data)
    return data;
});

export const categorySlice = createSlice({
    name: "categorySlice",
    initialState: {
        loading: null,
        totalItems: "",
        data: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetCategories.pending, (state) => {
            state.loading = true;
        }).addCase(GetCategories.fulfilled, (state, { payload }) => {
            state.data = payload.data.data;
            state.totalItems = payload.data.total
            state.loading = false;
        }).addCase(GetCategories.rejected, (state, { payload }) => {
            state.loading = false;
        })
    }
});

export default categorySlice.reducer;